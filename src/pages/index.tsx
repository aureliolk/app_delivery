import Head from 'next/head';
import { MatchBreakpoint } from 'react-hook-breakpoints';
import { GetServerSideProps } from 'next';
import jwt from 'jsonwebtoken';

import Headers from "../components/headers";
import Banner from "../components/banner";
import Find from "../components/find";
import List from "../components/list";
import { parseCookies } from 'nookies';

const axios = require("axios").default





export type UserProps = {
  firstName: string
  product: String[]
}

export default function Home({ firstName,product }: UserProps) {
  return (
    <div>
      <Head>components
        <title>App Delivery</title>
      </Head>
      <MatchBreakpoint is={"desktop"} >
        <div className="w-[80%] m-auto sm:w-full">
          <Headers user={firstName} />
          <Banner />
        </div>
        <div className="bg-[#f9f9fb]">
          <Find />
        </div>
        <div className="w-[80%] m-auto sm:w-full sm:p-6">
          <List product={product} />
        </div>
      </MatchBreakpoint>
      <MatchBreakpoint is={"mobile"} >
        <div className="w-full">
          <Headers user={firstName} />
          <Banner />
          <div className='px-6 py-2'>
            <List product={product} />
          </div>
        </div>  
      </MatchBreakpoint>

    </div>
  )
};



export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.post("http://localhost:3000/api/product",{
    category: "Tradicionais"
  })
  const product = res.data
  const { 'c.token': token } = parseCookies(ctx)
    if (!token) {
        return {
            props: {
              product
            }
        }
    }

    const decode: any = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
    console.log(decode)
    const firstName = decode.firstName
    
    return {
        props: {
          firstName,
            product
        }
    }
 }

