import Link from "next/link";
import { BsFillRecordFill } from "react-icons/bs";


interface LogoPorps {
    name: string;
    
}
export function Logo({ name }: LogoPorps) {
    return (
        <Link href={"/"}>
            <h1 className="font-calistoga cursor-pointer font-bold flex items-center text-[34px] gap-1 sm:text-[36px] sm:justify-center">{name}
                <div><BsFillRecordFill color="#FB9400" size={"12px"} /></div> Burguer
            </h1>
        </Link>
    )
}


export default Logo