import { APIMethods, APIStatuses, Combo, Games, GeneralAPIResponses, TypedResponse } from '@/shared/types'
import { fetchCombosByMoveId } from '@/shared/utils'
import { NextApiRequest } from 'next'

const handler = async (req: NextApiRequest, res: TypedResponse<Record<string, Combo[]>>) => {
	const { method, body, query } = req
	const moveId = parseInt(query.moveId as string)
	const game: Games = body.game ?? Games.SF6

	if (isNaN(moveId)) {
		console.error('e', GeneralAPIResponses.FAILURE)
		return res.status(400).json({
			status: APIStatuses.ERROR,
			type: GeneralAPIResponses.INVALID_REQUEST_TYPE,
			data: { error: `Move ID is invalid.` }
		})
	}

	if (method === APIMethods.GET) {
		try {
			// TODO: Implement filtering here
			const apiResponseData = await fetchCombosByMoveId(moveId, game)
			if (apiResponseData.length) {
				return res.status(200).json({ combos: apiResponseData })
			} else {
				return res.status(404).json({ status: APIStatuses.FAILURE, type: GeneralAPIResponses.NOT_FOUND })
			}
		} catch (e) {
			console.error('e', e)
			return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else {
		return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}
}

export default handler
