import Head from 'next/head';
import { MatchBreakpoint } from 'react-hook-breakpoints';

import { Headers } from "./components/headers";
import { Banner } from "./components/banner";
import { Find } from "./components/find";
import { List } from "./components/list/list";



export type UserProps = {
  user: string
}

function Home({ user }: UserProps) {

  return (
    <>
      <Head>
        <title>App Delivery</title>
      </Head>
      <MatchBreakpoint is={"desktop"} >
        <div className="w-[80%] m-auto sm:w-full">
          <Headers />
          <Banner />
        </div>
        <div className="bg-[#f9f9fb]">
          <Find />
        </div>
        <div className="w-[80%] m-auto sm:w-full sm:p-6">
          <List />
        </div>
      </MatchBreakpoint>
      <MatchBreakpoint is={"mobile"} >
        <div className="w-full">
          <Headers/>
          <Banner />
          <div className='px-6 py-2'>
            <List />
          </div>
        </div>  
      </MatchBreakpoint>

    </>
  )
};

export default Home;

