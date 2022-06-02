import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import jwt from 'jsonwebtoken';
import Router from "next/router";
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
}


type AuthContextType = {
    signIn: (data: SignInProps) => Promise<void>
    signOut: () => void

    user: User

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
    setIdProduct: (id:string)=>void

    product: any
    setProduct: (data: any) => void

}


type ChildrenProps = {
    children: any;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: ChildrenProps) {
    const [msg, setMsg] = useState<any>()
    const [user, setUser] = useState<any>()
    const [product, setProduct] = useState<any>()
    const [isLoading, setIsLoading] = useState(false)
    const [delLoading, setDelLoading] = useState(false)
    const [idProduct, setIdProduct] = useState<string>("")



    useEffect(() => {
        const { 'c.token': token } = parseCookies()
        if (token) {
            const decode: any = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
            setUser(decode.user)
        }
    }, [])


    async function signIn({ email, password, type, name }: SignInProps) {
        setIsLoading(true)
        await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                type,
                name
            })
        })
            .then(res => res.json())
            .then((res) => {
                if (!res.msg) return (
                    setCookie(undefined, 'c.token', res.token, {
                        maxAge: 60 * 60 * 1  //1 hour
                    }),
                    setUser(res.user),
                    setMsg(null),
                    setIsLoading(false),
                    Router.push("/login")
                )
                setMsg(res.msg)
                setIsLoading(false)
            })
    }

    async function signOut() {
        destroyCookie(undefined, "c.token")
        setUser(null)
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
        <AuthContext.Provider value={{ setMsg, signIn, signOut, setIsLoading, AddProduct, setProduct, ListProduct, DeleteProduct, setDelLoading,setIdProduct,idProduct, delLoading, product, isLoading, msg, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider