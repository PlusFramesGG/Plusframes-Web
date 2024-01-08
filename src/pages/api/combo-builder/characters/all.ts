import {
	TypedResponse,
	APIMethods,
	APIStatuses,
	GeneralAPIResponses,
	Character,
	Games,
	gameUrlMappings
} from '@/shared/types'
import { NextApiRequest } from 'next'

const handler = async (req: NextApiRequest, res: TypedResponse<Record<string, Character[]>>) => {
	const { method, body } = req
	const game: Games = body.game ?? Games.SF6

	if (method === APIMethods.GET) {
		try {
			const apiResponse = await fetch(`${gameUrlMappings[game]}/characters`)
			if (!apiResponse.ok) throw new Error('API response failed')

			const apiResponseData = (await apiResponse.json()) as Character[]
			if (!apiResponseData || !apiResponseData.length) throw new Error('No data found for get all characters endpoint')

			return res.status(200).json({ characters: apiResponseData })
		} catch (e) {
			console.error('e', e)
			return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}
}

export default handler
