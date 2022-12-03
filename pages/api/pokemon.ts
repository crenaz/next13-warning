// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import pokemon from '../../data/pokemon.json';



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof pokemon>
) {
  res.status(200).json(pokemon)
}
