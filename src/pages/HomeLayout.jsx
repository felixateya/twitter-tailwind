import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../hooks/useAuth";

const HomeLayout = () => {
  const { user, isAuthenticated } = useAuth();
  console.log(user, isAuthenticated);
  const location = useLocation();
  const path = location.pathname.replace("/", "");
  console.log(path)

  return (
    <div className="bg-[#15202B] relative w-full min-h-screen flex">
      <Sidebar />
      <div className="w-[41%] ml-[23%] h-full border-r-[1px] flex flex-col border-r-gray-600">
        <h3 className="text-2xl font-bold text-left border-b-2 h-max p-2 border-b-gray-600 text-white capitalize">
          {path === "" ? "home" : path}
        </h3>
        <main className="w-full overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
