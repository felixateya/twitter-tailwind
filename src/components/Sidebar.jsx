/* eslint-disable react/prop-types */
import { FaRegEnvelope, FaRegUser, FaXTwitter } from "react-icons/fa6";
import {
  GoBell,
  GoBellFill,
  GoHome,
  GoHomeFill,
  GoSearch,
} from "react-icons/go";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import toast from "react-hot-toast";
import { FaEnvelope, FaSearch, FaUser } from "react-icons/fa";
import { useData } from "../hooks/useData";


const Sidebar = ({ setLoading }) => {
  const {user} = useData()
  const location = useLocation();
  const path = location.pathname;
  const linkList = [
    {
      to: "/",
      text: "Home",
      icon: <GoHome />,
      activeIcon: <GoHomeFill />,
    },
    {
      to: "/explore",
      text: "Explore",
      icon: <GoSearch />,
      activeIcon: <FaSearch />,
    },
    {
      to: "/notifications",
      text: "Notifications",
      icon: <GoBell />,
      activeIcon: <GoBellFill />,
    },
    {
      to: "/messages",
      text: "Messages",
      icon: <FaRegEnvelope />,
      activeIcon: <FaEnvelope />,
    },
    {
      to: "/profile",
      text: "Profile",
      icon: <FaRegUser />,
      activeIcon: <FaUser />,
    },
  ];

  const navigate = useNavigate();
  const { signout } = useAuth();
  const handleSignout = async () => {
    try {
      setLoading(true);
      setTimeout(async () => {
        await signout(navigate, setLoading);
      }, 3000);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <aside className="w-[23%] border-r-[1px] fixed left-0 top-0 flex flex-col gap-6 xl:pl-10 pl-2 py-2 border-r-gray-600 h-full">
      <Link
        to="/"
        className="font-bold flex items-center text-4xl rounded-full text-white p-4 transition-600 hover:text-gray-200"
      >
        <FaXTwitter />
      </Link>
      <div className=" flex gap-4 flex-col">
        {linkList.map((mylink) => (
          <NavLink
            key={mylink.text}
            to={mylink.to}
            className="text-2xl text-gray-300 font-normal  w-max  flex items-center gap-1 transition-600 hover:text-white"
          >
            <p className="text-3xl">
              {path === mylink.to ? mylink.activeIcon : mylink.icon}
            </p>
            <p className="hidden xl:block">{mylink.text}</p>
          </NavLink>
        ))}
      </div>
      <button
        onClick={handleSignout}
        className="bg-blue-600 hover:bg-blue-700 transition-600 text-xl font-semibold rounded-full p-4 text-white w-[80%]"
      >
        Log Out
      </button>
      <div className="flex items-center gap-2 cursor-pointer transition-600 w-[80%] py-2 px-6 rounded-full">
        <img
          className="w-16 h-16 rounded-full border-gray-500 border-4"
          src="/prof-image.jpg"
          alt="profile-image"
        />
        {/* {user ? (
          <div>
            <p className="text-lg text-white font-semibold">{user}</p>
            <p className="text-gray-500 text-sm ">@{user}</p>
          </div>
        ) : (
          <MiniLoader />
        )} */}
        <div>
            <p className="text-lg text-white font-semibold">{user}</p>
            <p className="text-gray-500 text-sm ">@{user}</p>
          </div>
      </div>
    </aside>
  );
};

export default Sidebar;
