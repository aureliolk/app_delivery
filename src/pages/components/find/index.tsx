import {BiSearch} from "react-icons/bi"
import {IoIosArrowDown} from "react-icons/io"
 

export function Find(){
    return(
        <div className="w-[80%] container m-auto py-12 ">
            <h2 className="font-inter text-[24px] w-[25%] leading-[30px] font-medium mb-6">Pesquise o seu Hamburguer favorito!</h2>
            <div className="flex justify-between">
                <form className="bg-c_white w-[30%] p-2 gap-1 flex justify-between rounded">
                    <button type="submit" className="w-[48px] h-[40px] flex justify-center items-center bg-[#f9f9fb] rounded"><BiSearch color="#fb9400"/></button>
                    <input type="text" className="w-full text-center text-[14px] font-inter outline-c_orange" placeholder="Digite o nome do Burguer" />
                </form>
                <form className="bg-c_white w-[30%] p-2 gap-1 flex justify-between rounded">
                    <input type="text" className="w-full text-center text-[14px] font-inter outline-c_orange" placeholder="Todos os Hamburguer" />
                    <button type="submit" className="w-[48px] h-[40px] flex justify-center items-center bg-[#f9f9fb] rounded"><IoIosArrowDown color="#fb9400"/></button>
                </form>
            </div>
        </div>
    )
}