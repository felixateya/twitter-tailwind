import { FaRegEnvelope, FaRegUser, FaXTwitter } from "react-icons/fa6";
import { GoBell, GoHome, GoSearch } from "react-icons/go";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar = () => {
  const linkList = [
    {
      to: "/",
      text: "Home",
      icon: <GoHome />,
    },
    {
      to: "/search",
      text: "Search",
      icon: <GoSearch />,
    },
    {
      to: "/notifications",
      text: "Notifications",
      icon: <GoBell />,
    },
    {
      to: "/messages",
      text: "Messages",
      icon: <FaRegEnvelope />,
    },
    {
      to: "/profile",
      text: "Profile",
      icon: <FaRegUser />,
    },
  ];
  const navigate = useNavigate();
  const { signout } = useAuth();
  return (
    <aside className="w-[23%] border-r-[1px] flex flex-col gap-6 pl-10 py-2 border-r-white h-full">
      <Link className="font-bold flex items-center ml-4 text-3xl w-14 h-14 rounded-full p-4 transition-600 hover:bg-gray-300">
        <FaXTwitter />
      </Link>
      <div className=" flex gap-4 flex-col">
        {linkList.map((mylink) => (
          <NavLink
            key={mylink.text}
            to={mylink.to}
            className="text-2xl text-white font-normal rounded-full w-max py-2 px-4 flex items-center gap-2 transition-600 hover:bg-white hover:font-semibold hover:text-black"
          >
            <p>{mylink.icon}</p>
            <p>{mylink.text}</p>
          </NavLink>
        ))}
      </div>
      <button
        onClick={() => signout(navigate)}
        className="bg-blue-600 hover:bg-blue-700 transition-600 text-xl font-semibold rounded-full p-4 text-white w-[80%]"
      >
        Log Out
      </button>
      <div className="flex items-center gap-2 cursor-pointer transition-600 w-[80%] py-2 px-6 rounded-full hover:border-[1px] hover:border-white hover:text-black">
        <img
          className="w-10 h-10 rounded-full"
          src="/prof-image.jpg"
          alt="profile-image"
        />
        <div>
          <p className="text-sm text-white font-semibold">username</p>
          <p className="text-gray-200 text-sm ">@username</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
