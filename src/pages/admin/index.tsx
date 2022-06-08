import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Headers from "../../components/headers"
import jwt from 'jsonwebtoken';


import ProductForm from "../product";


export default function Admin(user: any){
    return(
        <div className="w-[80%] m-auto">
            <Headers user={user} />
            <ProductForm />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'c.token': token } = parseCookies(ctx)
      if (!token) {
          return {
              props: {}
          }
      }
  
      const decode: any = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
      const user = decode.user.name
  
      return {
          props: {
              user
          }
      }
   }