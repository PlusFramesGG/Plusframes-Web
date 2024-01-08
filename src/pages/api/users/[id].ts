import firebase_app from '@/lib/firebase'
import {
	APIMethods,
	APIStatuses,
	CollectionNames,
	DocumentResponses,
	GeneralAPIResponses,
	PFUser,
	TypedResponse
} from '@/shared/types'
import { currentUser } from '@clerk/nextjs'
import { collection, deleteDoc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore'
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

	const user = await currentUser()

	if (!user) {
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
		const querySnapshot = await getDocs(q)

		if (querySnapshot.empty) {
			console.error('e', DocumentResponses.DATA_NOT_FOUND)
			return res.status(404).json({
				status: APIStatuses.ERROR,
				type: DocumentResponses.DATA_NOT_FOUND,
				data: { error: `Could not find the user with the Clerk id of ${id}` }
			})
		}

		const user = querySnapshot.docs[0].data() as PFUser
		const userDocumentRef = querySnapshot.docs[0].ref

		if (method === APIMethods.GET) {
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
