import { Outlet, useResolvedPath } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import FullpageLoader from "../components/FullpageLoader";
import { useEffect, useState } from "react";
import { useData } from "../hooks/useData";

const HomeLayout = () => {
  
  const [loading, setLoading] = useState(false);
  const { pathname } = useResolvedPath();
  const { theUserId } = useData();
  useEffect(() => {
    
    if (pathname.replace("/", "") === theUserId) {
      document.title = "Profile / X";
    }else if(pathname === "/"){
      document.title = "Home / X";

    } else {
      document.title = `${pathname.replace("/", "")} / X`;
    }
  }, [pathname, theUserId]);

  if (loading) return <FullpageLoader />;
  return (
    <div className="bg-black relative w-full min-h-screen flex">
      <Sidebar setLoading={setLoading} loading={loading} />
      <div className="w-[48%] ml-[23%] h-full flex flex-col ">
        <main className="w-full h-[90%] overflow-y-auto overflow-x-hidden ">
          <Outlet />
        </main>
      </div>
      <div className="border-l-gray-600 border-l-[1px] w-[30%] min-h-screen"></div>
    </div>
  );
};

export default HomeLayout;
