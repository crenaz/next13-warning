// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import pokemon from '../../data/pokemon.json';



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<
  | (typeof pokemon[0] & {
      image: string;
   })
   | undefined
   >
) {
  const p = pokemon.find((p) => p.id === Number(req.query.id ));
  res.status(200).json(
    p
      ? {
          ...p,
          image: `http://localhost:3000/${p.name.toLowerCase()}.jpg`,
        }
       : undefined
     );
}
