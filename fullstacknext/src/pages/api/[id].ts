// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {db} from '../../../lib/db'

export default async function handler(req, res) {
    const {id} = req.query
    if (req.method == "DELETE") {
        const data = await db.todo.delete({ where: { id: parseInt(id)}})
    }
    res.status(200).json({message: 'succes'})
    
  }