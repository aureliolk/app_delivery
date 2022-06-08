import { useRouter } from "next/router";
import { BsArrowLeftShort } from "react-icons/bs";
import Logo from "../../components/logo";

type HeadersLoginProps = {
    infor?: string
    title?: string   
}

export function HeadersLogin({infor, title}:HeadersLoginProps) {
    const router = useRouter()
    return (
        <>
            <div className="">
            <button onClick={()=>{router.back()}} ><BsArrowLeftShort color="#ec8b00" size={"30px"} /></button>
            <div className="text-center py-6">
                <Logo name="Acos" />
            </div>
            {title && <div className="text-[16px] font-extrabold text-center">{title}</div> }
            <div className="text-[12px] text-center p-4 px-8 mx-auto">
                <h2>{infor}</h2>
            </div>
            </div>
        </>
    )
}



export default HeadersLogin