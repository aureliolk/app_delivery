import jwt from 'jsonwebtoken';
import { parseCookies } from "nookies";
import { ButtonFill, ButtonUserSignOut } from "./components/buttons";
import { Headers } from "./components/headers";
import { Logo } from "./components/logo";
import { Menu } from "./components/menu";
import { Banner } from "./components/banner";
import { Find } from "./components/find";
import { List } from "./components/list/list";
import { GetServerSideProps } from "next/types";
import { MatchBreakpoint } from 'react-hook-breakpoints';



export type UserProps = {
  user: string
}

function Home({ user }: UserProps) {

  return (
    <>
      <div className="w-[80%] m-auto sm:w-full">
        <Headers>
          <Logo name="Acos" />
          <Menu />
          {user ? <ButtonUserSignOut name={user} /> : <ButtonFill name="Fazer Login" link={"/login"} />}
        </Headers>
        <Banner />
      </div>
      <MatchBreakpoint is={"desktop"} >
        <div className="bg-[#f9f9fb]">
          <Find />
        </div>
      </MatchBreakpoint>
      <div className="w-[80%] m-auto sm:w-full sm:p-6">
        <List />
      </div>
    </>
  )
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { 'c.token': token } = parseCookies(ctx)
  if (!token) {
    return {
      props: {
        user: false
      }
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