import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContexts";
import { AiOutlineUser } from "react-icons/ai"

interface ButtonProps {
    name: string;
    link?: string;
}

export function ButtonFill({ name, link }: ButtonProps) {
    return (
        <Link href={link || "/"} >
            <button className={`w-[240px] py-3 bg-c_orange text-[12px] text-c_lorange font-semibold rounded flex items-center justify-center cursor-pointer`}>
                {name}
            </button>
        </Link>
    )
}

export function Button({ name, link }: ButtonProps) {
    return (
        <Link href={link || "/"}>
            <button className={`w-[240px] py-3 border border-c_orange text-[12px] text-c_orange font-semibold rounded flex items-center justify-center cursor-pointer`}>
                {name}
            </button>
        </Link>
    )
}

export function ButtonSignOut({ name }: ButtonProps) {
    const { signOut } = useContext(AuthContext)
    return (
        <button onClick={signOut} className={`w-[240px] py-3 border border-c_orange text-[12px] text-c_orange font-semibold rounded flex items-center justify-center cursor-pointer`}>
            {name}
        </button>
    )
}

export function ButtonUserSignOut({ name }: ButtonProps) {
    return (
        <Link href={"/login"}>
            <button className={`w-[240px] py-3 border border-c_orange text-c_orange rounded flex text-[14px] items-center justify-center cursor-pointer gap-2`}>
                <AiOutlineUser className="text-[20px]" /> {name}
            </button>
        </Link>
    )
}




export default ButtonFill


