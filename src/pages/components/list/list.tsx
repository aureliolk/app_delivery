import Image from "next/image"
import { useEffect, useState } from "react"
import { MatchBreakpoint } from "react-hook-breakpoints";

import burguercard from "../../../public/Card-burger-1 1.png"
import { ItemProps } from "../banner";

export function List(){
    const [product, setProduct ] = useState<ItemProps[]>()
    const endPoint = "/api/product"

    useEffect(() => {
        async function DataFetch() {
            const api = "/api/product"
            const option = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await fetch(api, option)
            const data = await res.json()
            setProduct(data)
        }
        DataFetch()

    },[])


    return (
        <>  <MatchBreakpoint is={"desktop"}>
            <div className="py-8 grid grid-cols-3 gap-6">
                <div className="rounded-2xl shadow-2xl shadow-c_gray">
                    <div className="bg-[#fff9f2] h-[150px] rounded-t-lg text-center">
                        {/* <h3 className="p-1 flex justify-center items-center w-[30%] text-c_white text-[11px] font-semibold bg-c_orange rounded ">Promoção</h3> */}
                        <Image src={burguercard} width="200px" height="210px"/>
                    </div>
                    <div className="p-4 mt-6">
                        <h3 className="font-inter text-[12px] font-medium">Tradicionais</h3>
                        <h3 className="font-inter text-[24px] font-bold">Texas Burguer</h3>
                        <h3 className="font-inter text-[20px] font-semibold text-c_orange">R$ 25,50</h3>
                    </div>
                </div>
                <div className="rounded-2xl shadow-2xl shadow-c_gray">
                    <div className="bg-[#fff9f2] h-[150px] rounded-t-lg text-center">
                        {/* <h3 className="p-1 flex justify-center items-center w-[30%] text-c_white text-[11px] font-semibold bg-c_orange rounded ">Promoção</h3> */}
                        <Image src={burguercard} width="200px" height="210px"/>
                    </div>
                    <div className="p-4 mt-6">
                        <h3 className="font-inter text-[12px] font-medium">Tradicionais</h3>
                        <h3 className="font-inter text-[24px] font-bold">Texas Burguer</h3>
                        <h3 className="font-inter text-[20px] font-semibold text-c_orange">R$ 25,50</h3>
                    </div>
                </div>
                <div className="rounded-2xl shadow-2xl shadow-c_gray">
                    <div className="bg-[#fff9f2] h-[150px] rounded-t-lg text-center">
                        {/* <h3 className="p-1 flex justify-center items-center w-[30%] text-c_white text-[11px] font-semibold bg-c_orange rounded ">Promoção</h3> */}
                        <Image src={burguercard} width="200px" height="210px"/>
                    </div>
                    <div className="p-4 mt-6">
                        <h3 className="font-inter text-[12px] font-medium">Tradicionais</h3>
                        <h3 className="font-inter text-[24px] font-bold">Texas Burguer</h3>
                        <h3 className="font-inter text-[20px] font-semibold text-c_orange">R$ 25,50</h3>
                    </div>
                </div>
                <div className="rounded-2xl shadow-2xl shadow-c_gray">
                    <div className="bg-[#fff9f2] h-[150px] rounded-t-lg text-center">
                        {/* <h3 className="p-1 flex justify-center items-center w-[30%] text-c_white text-[11px] font-semibold bg-c_orange rounded ">Promoção</h3> */}
                        <Image src={burguercard} width="200px" height="210px"/>
                    </div>
                    <div className="p-4 mt-6">
                        <h3 className="font-inter text-[12px] font-medium">Tradicionais</h3>
                        <h3 className="font-inter text-[24px] font-bold">Texas Burguer</h3>
                        <h3 className="font-inter text-[20px] font-semibold text-c_orange">R$ 25,50</h3>
                    </div>
                </div>
                <div className="rounded-2xl shadow-2xl shadow-c_gray">
                    <div className="bg-[#fff9f2] h-[150px] rounded-t-lg text-center">
                        {/* <h3 className="p-1 flex justify-center items-center w-[30%] text-c_white text-[11px] font-semibold bg-c_orange rounded ">Promoção</h3> */}
                        <Image src={burguercard} width="200px" height="210px"/>
                    </div>
                    <div className="p-4 mt-6">
                        <h3 className="font-inter text-[12px] font-medium">Tradicionais</h3>
                        <h3 className="font-inter text-[24px] font-bold">Texas Burguer</h3>
                        <h3 className="font-inter text-[20px] font-semibold text-c_orange">R$ 25,50</h3>
                    </div>
                </div>
                <div className="rounded-2xl shadow-2xl shadow-c_gray">
                    <div className="bg-[#fff9f2] h-[150px] rounded-t-lg text-center">
                        {/* <h3 className="p-1 flex justify-center items-center w-[30%] text-c_white text-[11px] font-semibold bg-c_orange rounded ">Promoção</h3> */}
                        <Image src={burguercard} width="200px" height="210px"/>
                    </div>
                    <div className="p-4 mt-6">
                        <h3 className="font-inter text-[12px] font-medium">Tradicionais</h3>
                        <h3 className="font-inter text-[24px] font-bold">Texas Burguer</h3>
                        <h3 className="font-inter text-[20px] font-semibold text-c_orange">R$ 25,50</h3>
                    </div>
                </div>
            </div>
        </MatchBreakpoint>
        <MatchBreakpoint is={"mobile"}>
            <div className="grid grid-cols-2 gap-4">
            {product?.map((item:ItemProps)=>{
                return(
                    <div key={item.id} className="shadow-xl rounded">
                        <div className="relative bg-c_lorange flex justify-center h-[80px] rounded">
                            <img src={item.img} alt={`Burguer ${item.name}`} className="w-[100px] h-[106px] absolute"/>
                        </div>
                        <div className="mt-1 p-4 flex flex-col">
                            <div className="text-[10px]">{item.category}</div>
                            <div className="text-[20px] font-extrabold tracking-tighter whitespace-nowrap overflow-hidden">{item.name}</div>
                            <div className="text-[15px] font-bold text-c_orange">R$ {item.price}</div>
                        </div>
                    </div>
                )
            })}
            </div>
        </MatchBreakpoint>
        </>
    )
}



export default List