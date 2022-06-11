import { Router, useRouter } from "next/router"
import { destroyCookie } from "nookies"
import { BiUser } from "react-icons/bi"
import {RiCloseCircleFill} from "react-icons/ri"

type UserProps = {
    firstName: string
}

export const User = ({ firstName }: UserProps) => {
    const router = useRouter()

    async function signOut() {
        destroyCookie(undefined, "c.token")
        router.push("/login")
    }
    
    return (
        <div className=" flex justify-between text-[20px] font-bold border rounded border-c_orange hover:border-0">
            <button onClick={()=>{router.push("/admin")}} className="flex w-full items-center justify-center p-1 gap-2 rounded font-bold hover:bg-[#FFF6EC] hover:border hover:border-c_orange cursor-pointer">
                <BiUser className="text-[30px]" />
                <div className="leading-[14px]">
                    <p className="text-[10px] text-center">Bem Vindo</p>
                    <p className="text-center">{firstName}</p>
                </div>
            </button>
            <div className="w-[20%] flex items-center justify-center hover:bg-[#FCDCDC] hover:border hover:border-[#e91111] hover:rounded rounded-tl-none rounded">
                <button onClick={()=>{signOut()}}><RiCloseCircleFill className="text-[#E91111]"/></button>
            </div>
        </div>
    )
}