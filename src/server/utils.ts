import firebase_app from "@/lib/firebase";
import { CollectionNames, PFUser, PFUserFavoriteCombo, PFUserFavoriteCombos, UserRoles } from "@/shared/types";
import { getFirestore, collection, query, where, getDocs, addDoc, updateDoc, DocumentReference, deleteDoc } from "firebase/firestore";

export async function createUserIfNotExists(userId: string): Promise<DocumentReference> {
    console.log("Creating user");
    const db = getFirestore(firebase_app);
    const collectionRef = collection(db, CollectionNames.PFUSERS);

    try {
        const userQuery = query(collectionRef, where("clerkId", "==", userId));
        const userDocs = await getDocs(userQuery);

        if (!userDocs.empty) {
            // Exit if user already exists, returning the existing user data
            return userDocs.docs[0].ref;
        }

        const newUser: PFUser = {
            id: '',  // Placeholder, will be replaced by document ID after creation
            role: UserRoles.USER,
            clerkId: userId,
            firstName: '',
            lastName: '',
            username: ''
        };
        const documentRef: DocumentReference = await addDoc(collectionRef, newUser);

        newUser.id = documentRef.id;
        await updateDoc(documentRef, { id: documentRef.id });

        if (documentRef.id) {
            return documentRef;
        } else {
            console.error('Error', 'Could not create user');
            throw Error('Failed to create user.');
        }
    } catch (e) {
        console.error('Error', e);
        throw e;
    }
}

export async function getUserComboFavorites(userId: string): Promise<PFUserFavoriteCombos> {
    const db = getFirestore(firebase_app);
    const collectionRef = collection(db, CollectionNames.PFUSERS_FAVORITE_COMBOS);

    try {
        const userQuery = query(collectionRef, where("userid", "==", userId));
        const querySnapshot = await getDocs(userQuery);
        const favorites: PFUserFavoriteCombos = {
            comboId: querySnapshot.docs.map(doc => doc.data().comboId)
        };
        return favorites;
    } catch (e) {
        console.error('Error fetching user combo favorites:', e);
        throw e; 
    }
}


export async function addUserComboFavorites(userId: string, comboId: number): Promise<PFUserFavoriteCombo> {
    const db = getFirestore(firebase_app);
    const collectionRef = collection(db, CollectionNames.PFUSERS_FAVORITE_COMBOS);
    const docRef = await addDoc(collectionRef, { userId, comboId });
    return { userId, comboId };
}


export async function removeUserComboFavorites(userId: string, comboId: number) {
    const db = getFirestore(firebase_app);
    const collectionRef = collection(db, CollectionNames.PFUSERS_FAVORITE_COMBOS);
    const comboQuery = query(collectionRef, where("userId", "==", userId), where("comboId", "==", comboId));
    const querySnapshot = await getDocs(comboQuery);
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises); 
}