interface ChildrenProps{
    children: any;
}

export function Headers({children}: ChildrenProps){
    return(
        <div className="h-[100px] flex justify-between items-center border-b border-b-[#c4c4c4]">
            {children}
        </div>
    )
}

export default Headers