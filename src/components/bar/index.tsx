import { MatchBreakpoint } from "react-hook-breakpoints"

type BarProps = {
    className?: string
}

export function Bar({className}:BarProps) {
    return (
        <>
            <MatchBreakpoint is={"desktop"}>
                <div className="border-1 border-b border-b-[#c4c4c4] flex justify-center">
                    <hr className="absolute w-[40rem] border-c_orange" />
                </div>
            </MatchBreakpoint>
            <MatchBreakpoint is={"mobile"}>
                <div className={className}>
                    <div className="border-b border-b-[#c4c4c4] flex justify-center relative">
                        <hr className="absolute w-[70%] border-1 border-c_orange " />
                    </div>
                </div>
            </MatchBreakpoint>
        </>

    )
}

export default Bar