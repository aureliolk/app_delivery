import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContexts";

interface ButtonProps{
    name: string;
    link?: string;
}

export function ButtonFill({name, link}:ButtonProps){
    return(
    <Link  href={link || "/"} >
        <div className={`w-[240px] h-[44px] bg-c_orange text-[12px] text-c_lorange font-semibold rounded flex items-center justify-center cursor-pointer`}>
            {name} 
        </div>
    </Link>
    )
}

export function Button({name, link}:ButtonProps){
    return(
        <Link  href={link || "/"}>
        <div className={`w-[240px] h-[44px] border border-c_orange text-[12px] text-c_orange font-semibold rounded flex items-center justify-center cursor-pointer`}>
                {name}
            </div>
        </Link>
    )
}

export function ButtonSignOut({name}:ButtonProps){
    const {signOut} = useContext(AuthContext)
    return(
        <button onClick={signOut} className={`w-[240px] h-[44px] border border-c_orange text-[12px] text-c_orange font-semibold rounded flex items-center justify-center cursor-pointer`}>
            {name}
        </button>
    )
}

export default ButtonFill


