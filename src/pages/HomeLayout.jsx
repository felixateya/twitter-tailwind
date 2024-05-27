import Sidebar from "../components/Sidebar"


const HomeLayout = () => {
  return (
    <div className="bg-white w-full h-screen flex">
        <Sidebar/>
        <main className="w-[40%] h-full border-[1px] border-r-gray-200"></main>
    </div>
  )
}

export default HomeLayout