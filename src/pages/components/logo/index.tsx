import Link from "next/link";
import { BsFillRecordFill } from "react-icons/bs";


interface LogoPorps {
    name: string;
}
export function Logo({name}: LogoPorps){
    return(
         <Link href={"/"}>
            <h1 className="font-inter flex items-center gap-1 text-[30px] justify-center cursor-pointer w-[30%] font-bold">
                {name} <div><BsFillRecordFill  color="#FB9400" size={"12px"} /></div> Burguer
            </h1>
         </Link>
    )
}


export default Logo