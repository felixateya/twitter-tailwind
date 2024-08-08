import { FaArrowLeft } from "react-icons/fa6";
import { useData } from "../hooks/useData";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import { Tooltip } from "@material-tailwind/react";
const UserProfile = () => {
  const { user, tweetList, theUserId } = useData();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const myTweets = tweetList.filter((tweet)=> tweet.userid === theUserId)
  const tweetlength = myTweets.length
  return (
    <div className="text-white relative w-full border-b-white">
      <div className="px-4 py-2 flex gap-3 items-center">
        <Tooltip content="Back" className="bg-gray-800 mt-2 text-white rounded-md p-2">

        <h5  className="cursor-pointer hover:bg-gray-800 rounded-full p-2 transition duration-300 ease-in-out" onClick={handleBack}>
          <FaArrowLeft />
        </h5>
        </Tooltip>
        <div className="flex flex-col">
          <h4 className="text-xl font-semibold">{user}</h4>
          <p className="text-gray-500">{tweetlength} posts</p>
        </div>
      </div>
      <img className="w-full h-[220px]" src="https://pbs.twimg.com/profile_banners/1114918867556499458/1716139798/600x200" alt="" />
      <img src="/prof-image.jpg" alt="" className="w-40 h-40 absolute top-[40%] left-10 rounded-full border-[5px] border-black"/>
      {/* <button className="border-[1px] border-gray-600 py-2 px-4 rounded-full absolute mt-4 right-6 font-semibold">Edit Profile</button> */}
      <EditProfile/>
      <div>
      <div className="mt-28 pl-12 flex relative flex-col">
        <h4 className="text-2xl font-bold">{user}</h4>
        <h5 className="text-gray-500 text-lg">@{user}</h5>
      </div>
      <p className="pl-12 mt-2 text-xl font-normal"> the bio of the user</p>
      </div>
    </div>
  );
};

export default UserProfile;
