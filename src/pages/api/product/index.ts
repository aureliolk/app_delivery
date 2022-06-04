import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../database/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "POST":
            const { name, category, price, promotion, img, description, idx } = req.body;
           
            if(idx){
                const findId = await prisma.products.findFirst({
                    where:{
                        id: idx
                    }
                })
                return res.status(200).json(findId)
            }
            
            const data = {
                name,
                category,
                price,
                promotion,
                description,
                img
            }
            const addProduct = await prisma.products.create({
                data
            })
            return res.json(addProduct)

            break;
        case "GET":
            const listProduct = await prisma.products.findMany()
            return res.json(listProduct)

            break;

        case "DELETE":
            const {id} = req.body;
            const deleteProduct =  await prisma.products.delete({
                where:{
                    id
                }
            })

            return res.json(deleteProduct)
        default:
            return res.json({ msg: "Method Icorrect" })

    }

};