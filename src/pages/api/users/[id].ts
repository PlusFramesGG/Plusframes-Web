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
import { createUserIfNotExists } from '@/shared/utils';
import { getAuth } from '@clerk/nextjs/server';
import { collection, deleteDoc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore'
import { NextApiRequest } from 'next'

// TODO: Long term we want to add payload shape verification
const handler = async (req: NextApiRequest, res: TypedResponse<PFUser>) => {
	console.log("Authorization Header:", req.headers.authorization);
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

	// const user = await currentUser()
	const auth = getAuth(req);

	if (!auth || !auth.userId) {
		console.log("no auth here")
		// console.log("req",req);
		// console.log("auth",auth);
		console.error('e', GeneralAPIResponses.UNAUTHORIZED)
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

		if (querySnapshot.empty) {
			console.log("empty..")
			createUserIfNotExists(auth.userId)
			querySnapshot = await getDocs(q)
		}

		const user = querySnapshot.docs[0].data() as PFUser
		const userDocumentRef = querySnapshot.docs[0].ref

		if (method === APIMethods.GET) {
			console.log("querySnapshot", querySnapshot)
			return res.status(200).json({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_FOUND,
				data: { user: { ...user, id: querySnapshot.docs[0].id } }
			})
		} else if (method === APIMethods.DELETE) {
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
