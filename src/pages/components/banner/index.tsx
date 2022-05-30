import Image from "next/image";
import { ButtonFill } from "../buttons";
import burger from "../../../public/burger-login 1.png"
import {FcOnlineSupport} from "react-icons/fc"

import { AiOutlineUser } from "react-icons/ai"
import { RiShoppingBag2Line } from "react-icons/ri"
import { FiMapPin } from "react-icons/fi"

export function Banner() {

    return (
        <div className="flex py-6 items-center">
            <div className="flex flex-col gap-8 w-[40%]">
                <p className="text-c_gray font-inter text-[14px] flex items-center gap-1"><FcOnlineSupport/> Perde Tempo não!</p>
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
    )
}