import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse<Record<string, string>>) {
	res.status(200).json({ status: 'Pringles' })
}
