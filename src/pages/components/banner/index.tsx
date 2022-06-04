import Image from "next/image";
import { ButtonFill } from "../buttons";
import burger from "../../../public/burger-login 1.png"
import { FcOnlineSupport } from "react-icons/fc"
import { AiOutlineUser } from "react-icons/ai"
import { RiShoppingBag2Line } from "react-icons/ri"
import { FiMapPin } from "react-icons/fi"
import { MatchBreakpoint } from "react-hook-breakpoints";
import { useEffect, useState } from "react";


export function Banner() {
    const [product, setProduct] = useState<ItemProps>()
    useEffect(() => {
        async function FindId() {
            const api = "/api/product"
            const option = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idx: "43b5bb96-b08c-40b7-9c38-c878d7192ee9"
                })
            }
            const res = await fetch(api, option)
            const data = await res.json()
            console.log(data)
            setProduct(data)
        }
        FindId()
    }, [])


    return (
        <>
            <MatchBreakpoint is={"desktop"}>
                <div className="flex py-6 items-center">
                    <div className="flex flex-col gap-8 w-[40%]">
                        <p className="text-c_gray font-inter text-[14px] flex items-center gap-1"><FcOnlineSupport /> Perde Tempo não!</p>
                        <h2 className="font-inter font-bold text-[45px] leading-[50px]">O Hamburguer mais delicioso da sua cidade</h2>
                        <p className="text-c_gray font-inter text-[14px]">Não passe vontade! Venha experimentar o melhor hambúrguer da cidade. Feito com os melhores cortes de carne, tempero especial e assado na brasa. Hamburgueria {"(coloque o nome)"}, a melhor opção para sua fome! </p>
                        <ButtonFill name="Fazer Pedido" />
                    </div>
                    <div className="w-[70%] bg-[url('../../../public/Ellipse 12.png')]">
                        <Image src={burger} />
                    </div>
                    <div className="w-[20%] flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <AiOutlineUser color="#fb9400" className="border-2 border-c_orange w-[50%] h-[70px] p-4 rounded" />
                            <div className="flex flex-col w-full h-[70px] justify-around">
                                <h3 className="font-inter font-bold text-[14px]">Logou</h3>
                                <hr className="border border-c_orange/50 w-[80%]" />
                                <hr className="border border-c_orange w-full" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <RiShoppingBag2Line color="#fb9400" className="border-2 border-c_orange w-[50%] h-[70px] p-4 rounded" />
                            <div className="flex flex-col w-full h-[70px] justify-around">
                                <h3 className="font-inter font-bold text-[14px]">Pediu</h3>
                                <hr className="border border-c_orange/50 w-[80%]" />
                                <hr className="border border-c_orange w-full" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <FiMapPin color="#fb9400" className="border-2 border-c_orange w-[50%] h-[70px] p-4 rounded" />
                            <div className="flex flex-col w-full h-[70px] justify-around">
                                <h3 className="font-inter font-bold text-[14px]">Chegou</h3>
                                <hr className="border border-c_orange/50 w-[80%]" />
                                <hr className="border border-c_orange w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </MatchBreakpoint>
            <MatchBreakpoint is={"mobile"}>
                <div className="p-6">
                    {product && (
                        <div className="shadow-2xl rounded  relative flex justify-between ">
                            <div className="text-[12px] p-4">
                                <div className="bg-c_orange text-c_white p-1 rounded font-semibold  w-[75px] text-center">{product.promotion === true && "Promoção"}</div>
                                <div className="font-extrabold text-[34px]">{product.name}</div>
                                <div className="text-[#6a7d8b]">{product.description}</div>
                                <div className="text-[32px] font-extrabold text-c_orange">R$ {product.price}</div>
                            </div>
                            <div className="bg-[#EC8B00] flex items-center w-[100px] rounded"></div>
                            <img src={product.img} alt={product.name + "img"} className="w-[135px] absolute top-[10%] right-0" />
                        </div>
                    )}
                </div>
            </MatchBreakpoint>
        </>
    )
}

type ItemProps = {
    id: string
    name: string,
    category: string,
    promotion: boolean,
    description: string
    price: string
    img: string
}

export default Banner

