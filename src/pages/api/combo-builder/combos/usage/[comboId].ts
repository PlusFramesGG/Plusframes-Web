import { APIMethods, APIStatuses, ComboUsage, Games, GeneralAPIResponses, TypedResponse } from '@/shared/types'
import { fetchComboUsage } from '@/shared/utils'
import { NextApiRequest } from 'next'

const handler = async (req: NextApiRequest, res: TypedResponse<Record<string, ComboUsage>>) => {
	const { method, body } = req
	const game: Games = body.game ?? Games.SF6
	const comboId = parseInt(req.query.comboId as string)

	if (!comboId) {
		console.error('e', GeneralAPIResponses.FAILURE)
		return res.status(400).json({
			status: APIStatuses.ERROR,
			type: GeneralAPIResponses.FAILURE,
			data: { error: `Combo ID not provided.` }
		})
	}

	if (method === APIMethods.GET) {
		try {
			const apiResponseData: ComboUsage = await fetchComboUsage(comboId, game)
			return res.status(200).json({ comboUsage: apiResponseData })
		} catch (e) {
			console.error('e', e)
			return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}
}

export default handler
