// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {db} from '../../../lib/db'

export default async function handler(req, res) {
    if (req.method === "GET") {
        const data = req.body;
        console.log('log from [id] came here')
        const dbresponse = await db.New.findUnique({
          where: {
            link: data
          }
        })
        console.log(dbresponse)
      }
    
    res.status(200).json({message: 'succes'})
    
  }