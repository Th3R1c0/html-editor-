// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {db} from '../../../lib/db'


export default async function handler(req, res) {
    if (req.method === "POST") {
      const data = req.body;
  
      await db.todo.create({
        data,
      });
  
      res.status(200).json({ message: "ok" });
    }

    if (req.method == "GET") {
        const data = await db.todo.findMany()
        res.status(200).json(data)
    }
  }