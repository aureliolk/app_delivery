import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../database/db";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, password, type } = req.body;
    if (!type) return res.status(401).json({ msg: "Campo type precisa ser informado!" });
    if (type === "register") {
      if (!name) return res.status(401).json({ msg: "Campo name está vazio!" });
      if (!email) return res.status(401).json({ msg: "Campo email está vazio!" });
      if (!password) return res.status(401).json({ msg: "Campo password está vazio!" });

      const userEmail = await prisma.user.findUnique({ where: { email } });
      if (userEmail) return res.status(401).json({ msg: "Campo email já existe!"});

      const data = {
        ...req.body,
        type:undefined,
        password: await bcrypt.hash(password, 10)
      }

      const user = await prisma.user.create({
        data
      })

      const token = jwt.sign({
        user
      }, process.env.NEXT_PUBLIC_JWT_SECRET as string)
      return res.status(200).json({
        token,
        user
      })

    }else if(type === "login"){
      if (!email) return res.status(200).json({ msg: "Campo email está vazio!" });
      if (!password) return res.status(200).json({ msg: "Campo password está vazio!" });

      const userEmail = await prisma.user.findUnique({ where: { email }});
      if(!userEmail) return res.status(200).json({msg:"E-mail ou Senha não confere!"})

      const checkEmail = await bcrypt.compare(password, userEmail.password)
      if(!checkEmail) return res.status(200).json({msg:"E-mail ou Senha não confere!"})

      const user = {
        ...userEmail,
        password: undefined
      }

      const token = jwt.sign({
        user
      }, process.env.NEXT_PUBLIC_JWT_SECRET as string)
      return res.status(200).json({
        token,
        user
      })

    }
  }else if(req.method === "GET"){
    const findAllUser = await prisma.user.findMany()
    res.status(200).json(findAllUser)
  }
}