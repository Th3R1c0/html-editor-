// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {db} from '../../../lib/db'

export default async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        console.log('before create')
        await db.New.create({
            data: {
                name: 'example'
            }
        });
      }
    console.log('came here')
    res.status(200).json({message: 'succes'})
    
  }