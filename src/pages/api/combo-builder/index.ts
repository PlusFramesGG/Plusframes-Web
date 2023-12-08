import type { NextApiRequest, NextApiResponse } from 'next'

// TODO: Flesh out with non-generics
type APIResponseData = {
	[k: string]: any
}

export default function handler(req: NextApiRequest, res: NextApiResponse<APIResponseData>) {
	res.status(200).json({ name: 'John Doe' })
}
