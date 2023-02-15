// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {db} from '../../../lib/db'

export default async function handler(req, res) {
    const data = req.body;
    if (req.method === "POST") {
        console.log('before create')
        await db.New.create({
            data: {
                name: 'exampleeee'
            }, 
        });
      }
      const LINK = await db.new.findFirst({
        where: {
            name: data
        }
    })
    console.log(LINK)
    res.status(200).json({link: LINK})
    
  }