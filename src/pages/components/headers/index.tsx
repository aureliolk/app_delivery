import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { MatchBreakpoint } from 'react-hook-breakpoints';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { GiForkKnifeSpoon } from 'react-icons/gi'
import { FiShoppingBag, FiHeart, FiSettings } from 'react-icons/fi'
import { BiFoodMenu } from 'react-icons/bi'
import jwt from 'jsonwebtoken';
import Find from '../find';
import ButtonFill from '../buttons';
import { useContext, useEffect, useState } from 'react';
import Bar from '../bar';
import Link from 'next/link';
import Logo from '../logo';
import Menu from '../menu';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContexts';



type HeaderProps = {
    user?: string,
    xxx?: string
}


export function Headers( {user, xxx}: HeaderProps ) {
    const {signOut} = useContext(AuthContext)
    const [ pathUrl, setPathUrl] = useState("/login")
    const [name, setName] = useState("Fazer Login")
    const [menu, setMenu] = useState(false)
    const router = useRouter()
    console.log(xxx)
    useEffect(()=>{
        if(document.location.pathname === "/login"){
            setPathUrl("/register")
            setName("Fazer Cadastro")
            // return
        }else if (document.location.pathname === "/register"){
            setPathUrl("/login")
            setName("Fazer Login")
            // return
            console.log("Path Register")
        }
    },[])

    function OpenMenu() {
        setMenu(true)
    }

    function CloseMenu() {
        setMenu(false)
    }

    return (
        <>
            <MatchBreakpoint is={"desktop"}>
                <div className="h-[100px] flex justify-between items-center border-b border-b-[#c4c4c4]">
                    {user}
                    <div className='w-[20%]'><Logo name='Acos'/></div>
                    <div className='w-[60%]'><Menu /></div>
                    <div className='w-[20%]'>{user ? <ButtonFill name={`${user}`} onClick={signOut}/> : <ButtonFill name={`${name}`} onClick={()=>{router.push(`${pathUrl}`)}}/> }</div>
                </div>
            </MatchBreakpoint>
            <MatchBreakpoint is={"mobile"}>
                {menu && (
                    <div className='w-full h-[100vh] bg-c_white fixed z-10 p-6'>
                        <div className='w-full flex justify-between  items-center'>
                            <Link href={"/login"}>
                                <button className='bg-c_orange text-c_white text-[15px] font-semibold h-[50px] w-[80%] rounded'>Fazer Login</button>
                            </Link>
                            <button onClick={() => { CloseMenu() }}><AiOutlineClose color='#fb9400' size="1.2rem" /></button>
                        </div>
                        <div className='mt-8'>
                            <Bar />
                        </div>
                        <div className='flex flex-col gap-6 py-8 text-[15px] text-[#6A7D8B]'>
                            <Link href={"/cardapio"}><div className='flex gap-2 items-center'><GiForkKnifeSpoon /> Cardapio</div></Link>
                            <Link href={"/bag"}><div className='flex gap-2 items-center'><FiShoppingBag /> Sacola</div></Link>
                            <Link href={"/fav"}><div className='flex gap-2 items-center'><FiHeart /> Favoritos</div></Link>
                            <Link href={"/order"}><div className='flex gap-2 items-center'><BiFoodMenu /> Meus Pedidos</div></Link>
                            <Link href={"/settings"}><div className='flex gap-2 items-center'><FiSettings /> Configurações</div></Link>
                        </div>
                    </div>
                )}
                <div className="bg-[#F9F9FB] p-6">
                    <div className='flex'>
                        <div className='w-[80%]'>
                            {user ? (
                                <h1 className='text-[24px] font-medium'>Seja Bem-Vindo <span className='font-bold'>{user}</span>
                                </h1>
                            ) : <h1 className='text-[24px] font-medium'>Seja Bem-Vindo</h1>}
                            <h2 className='text-[16px] font-normal text-[#979797]'> O que deseja para hoje</h2>
                        </div>
                        <div className='w-[20%] flex justify-end'>
                            <button onClick={() => { OpenMenu() }}><AiOutlineMenu color='#fb9400' size="2rem" /></button>
                        </div>
                    </div>
                    <div className='pt-4'>
                        <Find />
                    </div>
                </div>
            </MatchBreakpoint>
        </>
    )
}

export default Headers


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const user =  "Aurelio"
    
    return {
        props: {
            user
        }
    }
}