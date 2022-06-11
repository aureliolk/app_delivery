import { useContext } from "react";
import { useForm } from "react-hook-form";
import { MatchBreakpoint } from "react-hook-breakpoints";
import Link from "next/link";

import { AuthContext } from "../contexts/AuthContexts";
import {Button , ButtonFill } from "../../components/buttons";
import Bar from "../../components/bar";
import Headers from "../../components/headers";
import HeadersLogin from "./header";
import { FormLogin } from "../../components/forms/FormLogin";



interface Inputs {
    email: string,
    password: string,
};

export default function Login({ user }: any) {
    const { register, handleSubmit } = useForm<Inputs>();
    const { signIn, msg, setIsLoading } = useContext(AuthContext)

    async function onSubmit({ email, password }: Inputs) {
        if (email && password) {
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
            <MatchBreakpoint is={"desktop"}>
            <div className=" w-[80%] m-auto">
                        <Headers />
                        <div className="text-[12px] text-center p-4">
                            <h2>Use sua credencial para realizar o login</h2>
                        </div>
                        <Bar />
                        <div className="p-8 w-[60%] m-auto">
                            <FormLogin />
                        </div>
                    </div>
            </MatchBreakpoint>
            <MatchBreakpoint is={"mobile"}>
            <div className="p-6">
                        <HeadersLogin infor="Use sua credencial para realizar o login" />
                        <div className="">
                            <form className="flex justify-center flex-col items-center gap-6" method="GET" onSubmit={handleSubmit(onSubmit)}>
                                <input {...register("email")} className="text-center text-[12px] bg-c_lgray w-full py-3 rounded focus:outline-c_orange" type="email" placeholder="Digite seu E-mail" />
                                <input {...register("password")} className="text-center text-[12px] bg-c_lgray w-full py-3 rounded focus:outline-c_orange" type="password" placeholder="Digite sua Senha" />
                                <ButtonFill name="Fazer Login" />
                            </form>
                            {msg && (
                                <div className="mt-8">
                                    <Bar />
                                    <div className="flex justify-center mt-8 text-[12px]">
                                        {msg}
                                    </div>
                                </div>
                            )}
                            <div className="my-8">
                                <p className="text-[12px] text-center">Esqueceu sua senha? <Link href="/recovery" className="text-c_orange">Clique aqui</Link></p>
                            </div>
                            <Bar className="mt-8 mb-8" />
                            <div className="my-8">
                                <Button name="Quero me Cadastrar" />
                            </div>
                        </div>
                    </div>
            </MatchBreakpoint>
        </>
    )
}


