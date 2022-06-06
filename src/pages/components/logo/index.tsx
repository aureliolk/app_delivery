import Link from "next/link";
import { useRouter } from "next/router";
import { BsFillRecordFill } from "react-icons/bs";


interface LogoPorps {
    name: string;
    
}
export function Logo({ name }: LogoPorps) {
    const router = useRouter()

    return (
        <button onClick={()=>{router.push("/")}} >
            <h1 className="font-calistoga cursor-pointer font-bold flex items-center text-[34px] gap-1 sm:text-[36px] sm:justify-center">{name}
                <div><BsFillRecordFill color="#FB9400" size={"12px"} /></div> Burguer
            </h1>
        </button>
    )
}


export default Logo