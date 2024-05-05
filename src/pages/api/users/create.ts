import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server';
import {
	GeneralAPIResponses,
	APIStatuses,
	APIMethods,
	CollectionNames,
	DocumentResponses,
	TypedResponse,
	PFUser,
	UserRoles
} from '@/shared/types'
import firebase_app from '@/lib/firebase'
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore'

// TODO: Wire this up in `afterAuth`
const handler = async (req: NextApiRequest, res: TypedResponse<PFUser>) => {
	const { method, body } = req
	const db = getFirestore(firebase_app)
	const collectionRef = collection(db, CollectionNames.USERS)

	if (method !== APIMethods.POST) {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}

	try {
		const user = getAuth(req);

		if (!user) {
			console.error('e', GeneralAPIResponses.UNAUTHORIZED)
			return res.status(400).json({
				status: APIStatuses.ERROR,
				type: GeneralAPIResponses.UNAUTHORIZED,
				data: { error: `Client is not authenticated.` }
			})
		}

		const userQuery = query(collectionRef, where("id", "==", user.userId));
        const userDocs = await getDocs(userQuery);

        if (!userDocs.empty) {
            return res.status(409).json({
                status: APIStatuses.ERROR,
                type: GeneralAPIResponses.DATA_ALREADY_EXISTS,
                data: { error: "User already exists." }
            });
        }

		const documentRef = await addDoc(collectionRef, body)

		// TODO: Add support for additional roles here.
		const newUser: PFUser = { id: documentRef.id, role: UserRoles.USER, ...body }

		if (documentRef.id) {
			return res.status(201).json({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_CREATED,
				data: { user: newUser }
			})
		} else {
			console.error('e', DocumentResponses.DATA_NOT_CREATED)
			return res.status(400).json({
				status: APIStatuses.ERROR,
				type: DocumentResponses.DATA_NOT_CREATED,
				data: { error: 'Could not create user' }
			})
		}
	} catch (e) {
		console.error('e', e)
		return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
	}
}

export default handler
