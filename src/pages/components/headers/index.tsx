import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { MatchBreakpoint } from 'react-hook-breakpoints';
import { AiOutlineMenu } from 'react-icons/ai'
import jwt from 'jsonwebtoken';
import Find from '../find';




interface ChildrenProps {
    children: any;
    user?: string
}

export function Headers({ children, user }: ChildrenProps) {
    return (
        <>
            <MatchBreakpoint is={"desktop"}>
                <div className="h-[100px] flex justify-between items-center border-b border-b-[#c4c4c4]">
                    {children}
                </div>
            </MatchBreakpoint>
            <MatchBreakpoint is={"mobile"}>
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
                            <AiOutlineMenu color='#fb9400' size="2rem"/>
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