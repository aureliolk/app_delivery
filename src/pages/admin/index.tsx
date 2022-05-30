import { Button } from "../components/buttons";
import {Headers} from "../components/headers";
import Logo from "../components/logo";
import Menu from "../components/menu";

export default function Admin(){
    return(
        <>
            <Headers>
                <Logo name="Acos" />
                <Menu />
                <Button name="Admin" />
            </Headers>
        </>
    )
}