import firebase_app from '@/lib/firebase'
import {
	APIMethods,
	APIStatuses,
	ClerkResponses,
	CollectionNames,
	DocumentResponses,
	GeneralAPIResponses,
	PFUser,
	TypedRequest,
	TypedResponse
} from '@/shared/types'
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: TypedResponse<PFUser>) => {
	const { method } = req
	const { id } = req.query

	if (!id) {
		console.error('e', GeneralAPIResponses.INVALID_REQUEST_TYPE)
		res.status(400).json({
			status: APIStatuses.ERROR,
			type: GeneralAPIResponses.INVALID_REQUEST_TYPE,
			data: { error: `No clerk id passed to request.` }
		})
	}

	if (method === APIMethods.GET) {
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

			res.status(200).json({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_FOUND,
				data: { user: { ...user, id: querySnapshot.docs[0].id } }
			})
		} catch (e) {
			console.error('e', e)
			return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else if (method === APIMethods.DELETE) {
		// TODO: Implement
		console.log('Delete req received')
	} else if (method == APIMethods.PATCH) {
		// TODO: Implement
		console.log('Patch request received')
	} else {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}
}

export default handler
