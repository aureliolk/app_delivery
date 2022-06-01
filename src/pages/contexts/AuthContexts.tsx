import {  createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import jwt from 'jsonwebtoken';
import Router from "next/router";

type User = {
    name: String
    email: String
}

type SignInProps={
    password: String
    email: String
    type: String
    name?: String
}

type AuthContextType={
    signIn: (data: SignInProps)=>Promise<void>
    setMsg: any 
    signOut:() => void 
    isAuthenticated: boolean
    user: User | null
    msg: any
    isLoading: boolean
    setIsLoading: any
}

type ChildrenProps={
    children: any;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}:ChildrenProps){
    const [msg, setMsg] = useState<any | null>("")
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false)


    const isAuthenticated = !!user;

    useEffect(()=>{
        const {'c.token' : token} = parseCookies()
        if(token){
            const decode:any = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
            setUser(decode.user)
        }
    },[])

    async function signIn({email,password,type, name}:SignInProps){
        setIsLoading(true)
        await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email,
                password,
                type,
                name
            })
        })
        .then(res => res.json())
        .then((res)=>{
            if(!res.msg) return (
                setCookie(undefined,'c.token', res.token, {
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

    async function signOut(){
        destroyCookie(undefined, "c.token")
        setUser(null)
        Router.push("/login")
    }


    return(
        <AuthContext.Provider value={{ isAuthenticated, setMsg, signIn, signOut,setIsLoading,isLoading,  msg, user}}>
            {children}
        </AuthContext.Provider>
    )
}   

export default AuthProvider