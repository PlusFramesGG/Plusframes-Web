import firebase_app from '@/lib/firebase'
import { PF_API_BASE_URL } from '@/shared/constants';
import {
	APIMethods,
	APIStatuses,
	CollectionNames,
	DocumentResponses,
	GeneralAPIResponses,
	PFUser,
	TypedResponse
} from '@/shared/types'
import { createUserIfNotExists } from '@/server/utils';
import { getAuth } from '@clerk/nextjs/server';
import { DocumentData, DocumentReference, collection, deleteDoc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore'
import { NextApiRequest } from 'next'

// TODO: Long term we want to add payload shape verification
const handler = async (req: NextApiRequest, res: TypedResponse<PFUser>) => {
	const { method } = req
	const { id } = req.query

	if (!id) {
		console.error('e', GeneralAPIResponses.INVALID_REQUEST_TYPE)
		return res.status(400).json({
			status: APIStatuses.ERROR,
			type: GeneralAPIResponses.INVALID_REQUEST_TYPE,
			data: { error: `No clerk id passed to request.` }
		})
	}

	const auth = getAuth(req);

	if (!auth || !auth.userId) {
		return res.status(400).json({
			status: APIStatuses.ERROR,
			type: GeneralAPIResponses.UNAUTHORIZED,
			data: { error: `Client is not authenticated.` }
		})
	}

	try {
		const db = getFirestore(firebase_app)
		const usersCollectionRef = collection(db, CollectionNames.USERS)
		const q = query(usersCollectionRef, where('clerkId', '==', id))
		let querySnapshot = await getDocs(q)
		// let userDocumentRef: DocumentReference;

		let userDocumentRef: DocumentReference<DocumentData>;  // No need to allow null here

		if (querySnapshot.empty) {
			console.log("No user found, attempting to create one...");
			userDocumentRef = await createUserIfNotExists(auth.userId);

			if (!userDocumentRef) {
				throw new Error('Failed to create user.');
			}

			querySnapshot = await getDocs(q);  // Optionally re-fetch the snapshot
		} else {
			userDocumentRef = querySnapshot.docs[0].ref;
		}

		const user = (await getDoc(userDocumentRef)).data() as PFUser | undefined;

		if (method === APIMethods.GET) {
			return res.status(200).json({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_FOUND,
				data: { user: { ...user, id: querySnapshot.docs[0].id } }
			})
		} else if (method === APIMethods.DELETE) {
			// THIS will fail because of Firebase permissions
			await deleteDoc(userDocumentRef)
			return res.status(200).json({ status: APIStatuses.SUCCESS, type: DocumentResponses.DATA_DELETED })
		} else if (method == APIMethods.PATCH) {
			const updatedData = req.body
			await updateDoc(userDocumentRef, updatedData)
			const result = await getDoc(userDocumentRef)
			const document = result.data()

			return res
				.status(200)
				.json({ status: APIStatuses.SUCCESS, type: DocumentResponses.DATA_UPDATED, data: { user: document } })
		} else {
			return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
		}
	} catch (e) {
		console.error('e', e)
		return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
	}
}

export default handler
