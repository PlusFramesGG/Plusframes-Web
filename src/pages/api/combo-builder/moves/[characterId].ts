import { gameUrlMappings } from '@/shared/constants'
import { APIMethods, APIStatuses, Games, GeneralAPIResponses, Move, TypedResponse } from '@/shared/types'
import { fetchMovesByCharacterId } from '@/shared/utils'
import { NextApiRequest } from 'next'

const handler = async (req: NextApiRequest, res: TypedResponse<Record<string, Move[]>>) => {
	const { method, body } = req
	const characterId = req.query.characterId as string
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
		try {
			const apiResponseData = await fetchMovesByCharacterId(characterId, game)
			return res.status(200).json({ moves: apiResponseData })
		} catch (e) {
			console.error('e', e)
			return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}
}

export default handler
