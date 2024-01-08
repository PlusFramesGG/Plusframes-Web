import {
	APIMethods,
	APIStatuses,
	Games,
	GeneralAPIResponses,
	Move,
	TypedResponse,
	gameUrlMappings
} from '@/shared/types'
import { NextApiRequest } from 'next'

const handler = async (req: NextApiRequest, res: TypedResponse<Record<string, Move[]>>) => {
	const { method, body } = req
	const { characterId } = req.query
	const game: Games = body.game ?? Games.SF6

	if (!characterId) {
		console.error('e', GeneralAPIResponses.INVALID_REQUEST_TYPE)
		return res.status(400).json({
			status: APIStatuses.ERROR,
			type: GeneralAPIResponses.INVALID_REQUEST_TYPE,
			data: { error: `No character id passed to request.` }
		})
	}

	if (method === APIMethods.GET) {
		const apiResponse = await fetch(`${gameUrlMappings[game]}/combo_routes/starters/${characterId}`)
		if (!apiResponse.ok) throw new Error('API response failed')

		const apiResponseData = await apiResponse.json()
		if (!apiResponseData || !apiResponseData.length)
			throw new Error('No data found for the get moves by character id endpoint')

		return res.status(200).json({ moves: apiResponseData })
	} else {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}
}

export default handler
