import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../database/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "POST":
            var { name, category, price, promotion, img, description, idx } = req.body;
            if(name && price && promotion && img){
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
            }
           
            if(idx){
                const findId = await prisma.products.findFirst({
                    where:{
                        id: idx
                    }
                })
                return res.status(200).json(findId)
            }
            
            if(category){
                const findAllCategory = await prisma.products.findMany({
                    where:{
                        category
                    }
                })
                return res.status(200).json(findAllCategory)
            }

            

            break;
        case "GET":
            const listProduct = await prisma.products.findMany()
            return res.json(listProduct)

            break;
        case "PATCH":
            const { idup, nameup,categoryup} = req.body;
            const updateProduct = await prisma.products.update({
                where:{
                    id: idup
                },
                data:{
                    name: nameup,
                    category: categoryup,
                }
            })

            return res.json(updateProduct)

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