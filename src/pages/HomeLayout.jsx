import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { useAuth } from "../hooks/useAuth"



const HomeLayout = () => {

  const {user, isAuthenticated} = useAuth()
  console.log(user, isAuthenticated)
  
  return (
    <div className="bg-white w-full h-screen flex">
        <Sidebar/>
        <main className="w-[40%] h-full border-[1px] border-r-gray-200">
          <Outlet/>
        </main>
    </div>
  )
}

export default HomeLayout