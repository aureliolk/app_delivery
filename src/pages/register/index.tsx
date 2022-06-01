import { useForm } from "react-hook-form";
import { Bar } from "../components/bar";
import { ButtonFill, ButtonSignOut } from "../components/buttons";
import { Headers } from "../components/headers";
import { Logo } from "../components/logo";
import { Menu } from "../components/menu";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import Loading from "../components/loading";

interface Inputs {
    email: string
    password: string
    checkPassword: string
    name: string
};

export default function Login() {
    const { register, handleSubmit } = useForm<Inputs>();
    const { signIn, setMsg,  msg, user,isLoading } = useContext(AuthContext)

    async function onSubmit({ email, password, checkPassword,name }: Inputs) {
        
        if(password !== checkPassword){
            return setMsg("As senhas não são iguais!")
        }

        signIn({
            name,
            email,
            password,
            type: "register"
        })
    }

    return (
        <div className="container w-[80%] m-auto">
            <Headers>
                <Logo name="Acos" />
                <Menu />
                {user ? <ButtonSignOut name="Sair" /> : <ButtonFill name="Fazer Login" link={"/login"} />}
            </Headers>
            <div className="text-[12px] text-center p-4">
                <h2> Faça seu Cadastro </h2>
            </div>
            <Bar />
            <div className="p-8">
                <form className="flex justify-center flex-col items-center gap-6" method="GET" onSubmit={handleSubmit(onSubmit)}>

                    <input {...register("email")} className="text-center text-[12px] bg-c_lgray w-[70%] py-3 rounded focus:outline-c_orange" type="email" placeholder="Digite seu E-mail" />
                    <input {...register("name")} className="text-center text-[12px] bg-c_lgray w-[70%] py-3 rounded focus:outline-c_orange" type="text" placeholder="Digite seu Nome" />
                    <input {...register("password")} className="text-center text-[12px] bg-c_lgray w-[70%] py-3 rounded focus:outline-c_orange" type="password" placeholder="Digite sua Senha" />
                    <input {...register("checkPassword")} className="text-center text-[12px] bg-c_lgray w-[70%] py-3 rounded focus:outline-c_orange" type="password" placeholder="Digite sua Senha" />
                    
                    <button
                        className="text-[12px] w-[40%] rounded bg-c_orange py-3 text-c_white font-semibold flex justify-center"
                        type="submit"
                    >
                        {isLoading ? <Loading /> : "Fazer Cadastro"}
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
            <Bar />
        </div>
    )
}


