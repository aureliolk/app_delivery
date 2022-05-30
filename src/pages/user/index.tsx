import { ButtonSignOut } from "../components/buttons";
import Headers from "../components/headers";
import Logo from "../components/logo";
import Menu from "../components/menu";

export default function User() {
    return (

        <div className="container w-[80%] m-auto">
            <Headers>
                <Logo name="Acos" />
                <Menu />
                <ButtonSignOut name="Sair" />
            </Headers>
            <h1>User</h1>
        </div>
    )
}