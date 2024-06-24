import { CiCirclePlus } from "react-icons/ci"
import { FaCircleNotch, FaRegSmile } from "react-icons/fa"
import { IoImageOutline } from "react-icons/io5"
import { MdOutlineGifBox } from "react-icons/md"
import { PiChartBarHorizontal } from "react-icons/pi"


const TweetForm = () => {
  return (
    <div className="w-full h-40 border-b-8 border-b-gray-800">
    <div className="flex w-full h-[60%] p-2">
    
    <img className="w-16 h-16 rounded-[50%] border-gray-500" src="/prof-image.jpg" alt="" />
    
    <textarea className="w-5/6 bg-transparent text-gray-400 text-xl outline-none py-4 px-2 resize-none placeholder:text-xl placeholder:text-gray-400" name="" id="" placeholder="What's happening?"></textarea>
    </div>
    <div className="flex ml-[100px] w-5/6 justify-between px-2">
      <div className="flex gap-4 w-1/2 items-center ">
      
      <IoImageOutline className="text-blue-500 font-normal text-[27px]" />
      <MdOutlineGifBox className="text-blue-500 font-normal text-[27px]" />
      <PiChartBarHorizontal className="text-blue-500 font-normal text-[27px]" />
      <FaRegSmile className="text-blue-500 font-normal text-[27px]" />
      </div>
      <div className="flex gap-2 w-1/2 justify-end items-center">
      <FaCircleNotch className="text-gray-500 font-normal text-[27px]" />
      <CiCirclePlus className="text-blue-400 font-normal text-[27px]" />
      <button className="bg-blue-600 py-2 px-6 text-white w-max rounded-[30px]">Post</button>
      </div>
    </div>
    </div>
  )
}

export default TweetForm