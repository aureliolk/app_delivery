import Image from "next/image"
import burguercard from "../../../public/Card-burger-1 1.png"

export function List(){
    return (
        <>
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
        </>
    )
}


export default List