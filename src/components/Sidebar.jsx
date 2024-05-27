import { FaRegEnvelope, FaRegUser, FaXTwitter } from "react-icons/fa6";
import { GoBell, GoHome, GoSearch} from "react-icons/go";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-[23%] border-[1px] flex flex-col gap-6 pl-10 py-2 border-r-gray-200 h-full">
      <Link className="font-bold flex items-center ml-4 text-3xl w-14 h-14 rounded-full p-4 transition-600 hover:bg-gray-300">
        <FaXTwitter />
      </Link>
      <div className=" flex gap-4 flex-col">
        <NavLink to="/"  className="text-2xl font-normal rounded-full w-max py-2 px-4 flex items-center gap-2 transition-600 hover:bg-gray-200">
          <p>
            <GoHome />
          </p>
          <p className="text-gray-700">Home</p>
        </NavLink>
        <NavLink
          to="/search"
          className="text-2xl font-normal rounded-full w-max py-2 px-4 flex items-center gap-2 transition-600 hover:bg-gray-200"
        >
          <p>
            <GoSearch />
          </p>
          <p className="text-gray-700">Explore</p>
        </NavLink>

        <NavLink
          to="/notifications"
          className="text-2xl font-normal rounded-full w-max py-2 px-4 flex items-center gap-2 transition-600 hover:bg-gray-200"
        >
          <p>
            <GoBell />
          </p>
          <p className="text-gray-700">Notifications</p>
        </NavLink>
        <NavLink
          to="/messages"
          className="text-2xl font-normal rounded-full w-max py-2 px-4 flex items-center gap-2 transition-600 hover:bg-gray-200"
        >
          <p>
          <FaRegEnvelope />
          </p>
          <p className="text-gray-700">Messages</p>
        </NavLink>
        <NavLink
          to="/profile"
          className="text-2xl font-normal rounded-full w-max py-2 px-4 flex items-center gap-2 transition-600 hover:bg-gray-200"
        >
          <p>
            <FaRegUser />
          </p>
          <p className="text-gray-700">Profile</p>
        </NavLink>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 transition-600 text-xl font-semibold rounded-full p-4 text-white w-[80%]">Post</button>
      <div className=" flex items-center gap-2 cursor-pointer transition-600 w-[80%] py-2 px-4 rounded-full hover:bg-gray-300">
      <img className="w-10 h-10 rounded-full" src="/prof-image.jpg" alt="profile-image"/>
        <div>
          <p className="text-sm font-semibold">username</p>
          <p className="text-gray-500 text-sm">@username</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
