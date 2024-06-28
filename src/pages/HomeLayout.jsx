import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const HomeLayout = () => {
  const location = useLocation();
  const path = location.pathname.replace("/", "");
  console.log(path);

  return (
    <div className="bg-[#15202B] relative w-full min-h-screen flex">
      <Sidebar />
      <div className="w-[48%] ml-[23%] h-full flex flex-col ">
        <h3 className="text-2xl font-bold text-left border-b-2 h-max p-2 border-b-gray-600 text-white capitalize">
          {path === "" ? "home" : path}
        </h3>
        <main className="w-full h-[90%] overflow-y-auto overflow-x-hidden ">
          <Outlet />
        </main>
      </div>
      <div className="border-l-gray-600 border-l-[1px] w-[30%] min-h-screen"></div>
    </div>
  );
};

export default HomeLayout;
