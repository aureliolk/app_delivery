import { useForm } from "react-hook-form";
import { Bar } from "../../components/bar";
import Headers from "../../components/headers";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import Loading from "../../components/loading";

import { ImEye, ImEyeBlocked } from "react-icons/im"
import { HiOutlinePencilAlt } from "react-icons/hi"
import { GrUpdate } from "react-icons/gr"
import {FormSignIn} from "../../components/forms/FormSignIn";

const axios = require("axios").default

interface DataUser {
    id: string
    email: string
    password: string
    checkPassword: string
    firstName: string
    lastName: string
    admin: boolean
};



export default function Login({ users }: any) {
    const { register, handleSubmit } = useForm<DataUser>();
    const { setMsg, msg, isLoading, setIsLoading } = useContext(AuthContext)

    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [eyesState, setEyesState] = useState(false)
    const [typeInput, setTypeInput] = useState("")
    const [form, setFomr] = useState(false)
    const [formId, setFormId] = useState("")


    async function onSubmit(data: DataUser) {
        setIsLoading(true)

        if (!data.firstName) return setMsg("O campo primeiro nome está vazio!"), setIsLoading(false)
        if (!data.email) return setMsg("O campo e-mail está vazio!"), setIsLoading(false)
        if (!data.password || data.password != data.checkPassword) return setMsg("As senhas não são iguais!"), setIsLoading(false)

        const signin = await axios.post("/api/user/signin", {
            ...data,
            checkPassword: undefined
        })

        setMsg(signin.data.msg)
        console.log(signin.data)
        setIsLoading(false)
        return
    }

    
    function onForm(id: string) {
        if (form === true && id) {
            setFormId(id)
            setFomr(false)
        } else if (form === false) {
            setFormId(id)
            setFomr(true)
        }
    }


    return (
        <div className="w-[80%] m-auto">
            <Headers />
            <div className="text-[12px] text-center p-4">
                <h2> Faça seu Cadastro </h2>
            </div>
            <Bar />
            <div className="py-8 w-[75%] m-auto">
                <FormSignIn />
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const listUsers = await axios.get(process.env.BASE_URL + "/api/user")
    const users = listUsers.data

    return {
        props: {
            users
        }
    }
}