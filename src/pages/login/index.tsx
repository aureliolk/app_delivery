import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import jwt from 'jsonwebtoken';
import { parseCookies } from "nookies";
import { AuthContext } from "../contexts/AuthContexts";
import { useContext } from "react";
import { Button, ButtonFill, ButtonSignOut } from "../components/buttons";
import { Bar } from "../components/bar";
import { Headers } from "../components/headers";
import { Logo } from "../components/logo";
import { Menu } from "../components/menu";
import Loading from "../components/loading";
import {UserProps} from "../index"
import User from "../user";


interface Inputs {
    email: string,
    password: string,
};



export default function Login({user}:UserProps) {
    const { register, handleSubmit } = useForm<Inputs>();
    const { signIn, msg,isLoading,setIsLoading, isAuthenticated } = useContext(AuthContext)

    async function onSubmit({ email, password }: Inputs) {
        if(email && password){
            setIsLoading(true)
        }

        signIn({
            email,
            password,
            type: "login"
        })    
    }

    return (
        <>
        {user ? (
            <div className="container w-[80%] m-auto">
            <Headers>
                <Logo name="Acos" />
                <Menu />
                {user ? <ButtonSignOut name="Sair" /> : <ButtonFill name="Fazer Cadastro" link={"/register"}  />}
            </Headers>
            <div className="text-[13px] text-center p-4 flex justify-center gap-2">
                <h2 className="font-semibold">Bem vindo</h2> <span className="text-c_orange font-semibold">{user}</span> 
            </div>
            <Bar />

        </div>
        ):(
            <div className="container w-[80%] m-auto">
            <Headers>
                <Logo name="Acos" />
                <Menu />
                {user ? <ButtonSignOut name="Sair" /> : <ButtonFill name="Fazer Cadastro" link={"/register"}  />}
            </Headers>
            <div className="text-[12px] text-center p-4">
            <h2>Use sua credencial para realizar o login</h2>
            </div>
            <Bar />
            <div className="p-8">
                <form className="flex justify-center flex-col items-center gap-6" method="GET" onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("email")} className="text-center text-[12px] bg-c_lgray w-[70%] py-3 rounded focus:outline-c_orange" type="email" placeholder="Digite seu E-mail" />
                    <input {...register("password")} className="text-center text-[12px] bg-c_lgray w-[70%] py-3 rounded focus:outline-c_orange" type="password" placeholder="Digite sua Senha" />
                    <button
                        className="text-[12px] w-[40%] rounded bg-c_orange py-3 text-c_white font-semibold flex justify-center"
                        type="submit"

                    >
                        {isLoading ? <Loading /> : "Fazer Login" }
                    </button>
                </form>
                {msg && (
                    <div className="mt-8">
                        <Bar />
                        <div className="flex justify-center mt-8 text-[12px]">
                            {msg}
                        </div>
                    </div>
                )}

            </div>
            {/* {!isAuthenticated && (
                <>
                    <Bar />
                    <div className="p-8 flex justify-center">
                        <Button name="Fazer Cadastro" link="/register"/>
                    </div>
                </>
            )} */}
        </div>
        )}
        </>
    )
}


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