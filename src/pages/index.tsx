import { ButtonFill, ButtonSignOut } from "./components/buttons"
import { Headers } from "./headers"
import { Logo } from "./components/logo"
import { Menu } from "./components/menu"
import { useContext } from "react"
import { AuthContext } from "./contexts/AuthContexts"
import { Banner } from "./components/banner"
import { Find } from "./components/find"
import { List } from "./components/list/list"

function Home() {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <>
      <div className="container w-[80%] m-auto">
        <Headers>
          <Logo name="Acos" />
          <Menu />
          {isAuthenticated ? <ButtonSignOut name="Sair" /> : <ButtonFill name="Fazer Login" link={"/login"} />}
        </Headers>
        <Banner />
      </div>
      <div className="bg-[#f9f9fb]">
      <Find />
      </div>
      <div className="container w-[80%] m-auto">
        <List />
      </div>
    </>
  )
}

export default Home
