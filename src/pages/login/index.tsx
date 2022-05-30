import { useForm } from "react-hook-form";
import { Bar } from "../components/bar";
import { Button, ButtonFill, ButtonSignOut } from "../components/buttons";
import { Headers } from "../headers";
import { Logo } from "../components/logo";
import { Menu } from "../components/menu";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";

interface Inputs {
    email: string,
    password: string,
};

export default function Login() {
    const { register, handleSubmit } = useForm<Inputs>();
    const { signIn, msg, user, isAuthenticated } = useContext(AuthContext)

    console.log(msg)
    console.log(user)
    console.log(isAuthenticated)

    async function onSubmit({ email, password }: Inputs) {
        signIn({
            email,
            password,
            type: "login"
        })
    }

    return (
        <div className="container w-[80%] m-auto">
            <Headers>
                <Logo name="Acos" />
                <Menu />
                {user ? <ButtonSignOut name="Sair" /> : <ButtonFill name="Fazer Cadastro" link={"/register"}  />}
            </Headers>
            <div className="text-[12px] text-center p-4">
                {isAuthenticated ? `Bem vindo ${user?.name}` : <h2>Use sua credencial para realizar o login</h2>}
            </div>
            <Bar />
            <div className="p-8">
                <form className="flex justify-center flex-col items-center gap-6" method="GET" onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("email")} className="text-center text-[12px] bg-c_lgray w-[70%] py-3 rounded focus:outline-c_orange" type="email" placeholder="Digite seu E-mail" />
                    <input {...register("password")} className="text-center text-[12px] bg-c_lgray w-[70%] py-3 rounded focus:outline-c_orange" type="password" placeholder="Digite sua Senha" />
                    <button
                        className="text-[12px] w-[40%] rounded bg-c_orange py-3 text-c_white font-semibold"
                        type="submit"

                    >
                        Fazer Login
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
            {!isAuthenticated && (
                <>
                    <Bar />
                    <div className="p-8 flex justify-center">
                        <Button name="Fazer Cadastro" link="/register"/>
                    </div>
                </>
            )}
        </div>
    )
}


