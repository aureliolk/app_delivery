import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../database/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === 'GET') {
        const data = await prisma.business.findMany()
        return res.status(200).json({
          data
        })
    }else if (req.method === 'POST') {
      const {email, name} = req.body
      
      if(!name) return res.status(200).json({msg: 'Field is required'})

      const createbusiness = await prisma.business.create({
        data:{
          name,
          User:{
            create:{
              email
            }
          }
        }
      })

      return res.status(201).json({
        createbusiness
      })
    }
  }