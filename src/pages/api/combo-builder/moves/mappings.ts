import { APIMethods, APIStatuses, Games, GeneralAPIResponses } from '@/shared/types'
import { NextApiRequest, NextApiResponse } from 'next'
import moveMappings from '../../../../../data/move_mappings.json'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, query } = req
	const game: Games = (query.game as Games) ?? Games.SF6

	if (!game) {
		console.error('e', GeneralAPIResponses.FAILURE)
		return res.status(400).json({
			status: APIStatuses.ERROR,
			type: GeneralAPIResponses.FAILURE,
			data: { error: `Game not provided.` }
		})
	}

	if (method === APIMethods.GET) {
		return res.status(200).json(moveMappings)
	} else {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}
}

export default handler
