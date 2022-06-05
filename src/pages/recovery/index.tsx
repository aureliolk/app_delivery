import { Bar } from "../components/bar";
import { HeadersLogin } from "../login/header";
import { useForm } from "react-hook-form";
import ButtonFill from "../components/buttons";
import { Router, useRouter } from "next/router";

type InputProps = {
    email: string
}

export default function RecoveryPassWord() {
    const { register, handleSubmit } = useForm<InputProps>();
    const router = useRouter()

    function onSubmit(){
         console.log("clicando")

         router.push("/send")
    }

    return (
        <div className="p-6">
            <HeadersLogin title="Esqueceu sua Senha?" infor="Preencha o campo com seu e-mail e receva as instruções necessárias para refefinir a sua senha." />
            <Bar className="my-8" />
            <form className="flex flex-col gap-4" method="GET" onSubmit={handleSubmit(onSubmit)}>
                <input {...register("email")} className="text-center text-[12px] bg-c_lgray w-full py-3 rounded focus:outline-c_orange" type="email" placeholder="Digite seu E-mail" />
                <ButtonFill name="Enviar"/>
            </form>
        </div>
    )
}