import { createContext, useState } from "react";
import { setCookie, destroyCookie } from "nookies";
import Router from "next/router";
const axios = require("axios").default

const endpoint = '/api/product'


type User = {
    name: String
    email: String
}

type SignInProps = {
    password: String
    email: String
    type: String
    name?: String
}

type AddProductProps = {
    name: string,
    category: string,
    price: string,
    promotion: boolean,
    img: string
    description?: string
}


type AuthContextType = {
    signIn: (data: SignInProps) => Promise<void>
    signOut: () => void

    user: User | null

    setMsg: (data: string) => void
    msg: any

    isLoading: boolean
    setIsLoading: (data: boolean) => void
    delLoading: boolean
    setDelLoading: (data: boolean) => void

    AddProduct: (data: AddProductProps) => Promise<void>
    ListProduct: () => void
    DeleteProduct: (id: string) => Promise<void>

    idProduct: string
    setIdProduct: (id: string) => void

    product: any
    setProduct: (data: any) => void

}


type ChildrenProps = {
    children: any;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children}: ChildrenProps) {
    const [msg, setMsg] = useState<any>()
    const [product, setProduct] = useState<any>()
    const [isLoading, setIsLoading] = useState(false)
    const [delLoading, setDelLoading] = useState(false)
    const [idProduct, setIdProduct] = useState<string>("")
    const [user, setUser] = useState<User | null>(null)


    //FAZER SINGIN
    async function signIn({ email, password, type, name }: SignInProps) {
        setIsLoading(true)
        
        if(type === "login"){
            const res = await axios.post("/api/user", {
                email,
                password,
                type
            })
            if (res.data.msg) {
                setMsg(res.data.msg)
                setIsLoading(false)
                return
            }            
            setCookie(undefined, 'c.token', res.data.token, {
                maxAge: 60 * 60 * 1  //1 hour
            })

            setMsg(null)
            Router.push("/admin")
            setIsLoading(false)
        }
    }

    // FAZER SINGOUT
    async function signOut() {
        destroyCookie(undefined, "c.token")
        Router.push("/login")
    }

    //ADD PRODUCT
    async function AddProduct(data: AddProductProps) {
        try {
            const JSONdata = JSON.stringify(data)
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONdata,
            }
            const response = await fetch(endpoint, options)
            const result = await response.json()
            console.log(result)
            setMsg("Hamburguer Adicionado!")
        } catch (error) {
            setMsg(error)
        }
        setIsLoading(false)
    }

    //LIST PRODUCT
    async function ListProduct() {
        const options = {
            method: 'GET',
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
        setProduct(result)
        console.log(result)
    }

    //DELETE PRODUCT
    async function DeleteProduct(id: string) {
        setDelLoading(true)
        setIdProduct(id)
        try {
            const data = {
                id
            }
            const JSONdata = JSON.stringify(data)
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONdata
            }
            const response = await fetch(endpoint, options)
            const result = await response.json()
            console.log(result)
        } catch (error) {
            console.log(error)
        }
        setDelLoading(false)
    }

    return (
        <AuthContext.Provider value={{ setMsg, signIn, signOut, setIsLoading, AddProduct, setProduct, ListProduct, DeleteProduct, setDelLoading, setIdProduct, idProduct, delLoading, product, isLoading, msg, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

