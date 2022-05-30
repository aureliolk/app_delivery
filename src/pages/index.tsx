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


export type UserProps = {
  user: string
}

function Home({ user }: UserProps) {

  return (
    <>
      <div className="container w-[80%] m-auto">
        <Headers>
          <Logo name="Acos" />
          <Menu />
          {user ? <ButtonUserSignOut name={user} /> : <ButtonFill name="Fazer Login" link={"/login"} />}
        </Headers>
        <Banner />
      </div>
      <div className="bg-[#f9f9fb]">
        <Find />
      </div>
      <div className="container w-[80%] m-auto">
        <List />
      </div>
    </>
  )
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { 'c.token': token } = parseCookies(ctx)
  if(!token){
    return {
      props:{
        user:false
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