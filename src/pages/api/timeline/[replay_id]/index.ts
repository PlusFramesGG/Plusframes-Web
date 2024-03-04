import { PF_API_BASE_URL } from '@/shared/constants'
import { APIMethods, APIStatuses, GeneralAPIResponses } from '@/shared/types'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, query } = req
	const replay_id = query.replay_id as string

	if (!replay_id) {
		console.error('e', GeneralAPIResponses.INVALID_REQUEST_TYPE)
		return res.status(400).json({
			status: APIStatuses.ERROR,
			type: GeneralAPIResponses.INVALID_REQUEST_TYPE,
			data: { error: `No replay id passed to request.` }
		})
	}

	if (method === APIMethods.GET) {
		try {
			const request = await fetch(`${PF_API_BASE_URL}/raw_replay/${replay_id}`)
			const response = await request.json()

			res.status(200).json({ data: { ...response } })
		} catch (e) {
			console.error('e', e)
			return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}
}

export default handler
