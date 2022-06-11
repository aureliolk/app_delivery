import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "POST"){
        const data = req.body
        
        const updateUser = await prisma.user.update({
            where:{
                email: data.email
            },
            data
        }) 

        console.log(updateUser)
        
    }

    return res.status(404).json({msg:"Rota Invalida"})
}