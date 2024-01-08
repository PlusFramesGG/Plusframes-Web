import { TypedResponse, APIMethods, APIStatuses, GeneralAPIResponses, Character, Games } from '@/shared/types'
import { fetchCharactersByGame } from '@/shared/utils'
import { NextApiRequest } from 'next'

const handler = async (req: NextApiRequest, res: TypedResponse<Record<string, Character[]>>) => {
	const { method, body } = req
	const game: Games = body.game ?? Games.SF6

	if (method === APIMethods.GET) {
		try {
			const apiResponseData = await fetchCharactersByGame(game)
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
