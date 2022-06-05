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
import { useState } from 'react';
import Bar from '../bar';
import Link from 'next/link';




interface ChildrenProps {
    children: any;
    user?: string
}

export function Headers({ children, user }: ChildrenProps) {
    const [menu, setMenu] = useState(false)

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
                    {children}
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

    const { 'c.token': token } = parseCookies(ctx)
    if (!token) {
        return {
            props: {
                user: false
            }
        }
    }

    const decode: any = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
    const user = decode.user.name

    return {
        props: {
            user
        }
    }
}