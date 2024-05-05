import firebase_app from '@/lib/firebase'

import {
	APIMethods,
	APIStatuses,
	CollectionNames,
	DocumentResponses,
	GeneralAPIResponses,
	PFUser,
	PFUserFavoriteCombo,
	PFUserFavoriteCombos,
	TypedResponse
} from '@/shared/types'
import { addUserComboFavorites, createUserIfNotExists, getUserComboFavorites, removeUserComboFavorites } from '@/server/utils';
import { getAuth } from '@clerk/nextjs/server';
import { DocumentData, DocumentReference, collection, deleteDoc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore'
import { NextApiRequest } from 'next'

const handler = async (req: NextApiRequest, res: TypedResponse<PFUserFavoriteCombo|PFUserFavoriteCombos>) => {
	const { method } = req
	const { id, comboId } = req.query

	if (!id) {
		console.error('e', GeneralAPIResponses.INVALID_REQUEST_TYPE)
		return res.status(400).json({
			status: APIStatuses.ERROR,
			type: GeneralAPIResponses.INVALID_REQUEST_TYPE,
			data: { error: `No clerk id passed to request.` }
		})
	}
	if (!comboId && ((method === APIMethods.DELETE) || (method === APIMethods.PUT))) {
		
		console.error('e', GeneralAPIResponses.INVALID_REQUEST_TYPE)
		return res.status(400).json({
			status: APIStatuses.ERROR,
			type: GeneralAPIResponses.INVALID_REQUEST_TYPE,
			data: { error: `No combo id passed to request.` }
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
		const usersCollectionRef = collection(db, CollectionNames.PFUSERS)
		const q = query(usersCollectionRef, where('clerkId', '==', id))
		let querySnapshot = await getDocs(q)
		// let userDocumentRef: DocumentReference;

		let userDocumentRef: DocumentReference<DocumentData>;  // No need to allow null here

		if (querySnapshot.empty) {
			userDocumentRef = await createUserIfNotExists(auth.userId);

			if (!userDocumentRef) {
				throw new Error('Failed to create user.');
			}

			querySnapshot = await getDocs(q);  // Optionally re-fetch the snapshot
		} else {
			userDocumentRef = querySnapshot.docs[0].ref;
		}

		const user = (await getDoc(userDocumentRef)).data() as PFUser;
        if (!user.id) {
            throw Error("User document has no id")
        }

		if (method === APIMethods.GET) {
			return res.status(200).json({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_FOUND,
				data: await getUserComboFavorites(user.id)
			})
		} else if (method === APIMethods.DELETE) {
			const result = await removeUserComboFavorites(user.id, parseInt(comboId as string))
			return res.status(200).json({ status: APIStatuses.SUCCESS, type: DocumentResponses.DATA_DELETED, data: result })
		} else if (method == APIMethods.PUT) {
			const result = await addUserComboFavorites(user.id, parseInt(comboId as string))
			return res
				.status(200)
				.json({ status: APIStatuses.SUCCESS, type: DocumentResponses.DATA_CREATED, data: result })
		} else {
			return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
		}
	} catch (e) {
		console.error('e', e)
		return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
	}
}

export default handler
