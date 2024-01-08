import { TypedResponse, PFUser, APIMethods, APIStatuses, GeneralAPIResponses, Character } from '@/shared/types'
import { NextApiRequest } from 'next'

const handler = async (req: NextApiRequest, res: TypedResponse<Record<string, Character[]>>) => {
	const { method } = req

	if (method === APIMethods.GET) {
		try {
			const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_SF6_DATA_SERVICE_URL}/characters`)
			if (!apiResponse.ok) throw new Error('API response failed')

			const apiResponseData = (await apiResponse.json()) as Character[]
			if (!apiResponseData || !apiResponseData.length) throw new Error('No data found for get all characters endpoint')

			return res.status(200).json({ characters: apiResponseData })
		} catch (e) {
			console.error('e', e)
			return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	}
}

export default handler
