/* eslint-disable react/prop-types */
import { FaRegComment, FaRetweet } from "react-icons/fa"
import { IoIosHeartEmpty } from "react-icons/io"
import { MdOutlineFileUpload } from "react-icons/md"
import { useData } from "../hooks/useData"

const TweetDisplay = ({tweet}) => {
    const {user} = useData()
  return (
    <div className=" flex w-full flex-col  h-full p-2 border-b-[1px] border-b-gray-500">
        <div className="w-max flex gap-2">
        <img className="w-16 h-16 rounded-full" src="/prof-image.jpg" alt="" />
            <div className="flex gap-2 items-center">
                <p className="text-white font-semibold text-xl">{user}</p>
                <p className="text-gray-500 text-xl">@{user}</p>
            </div>
        </div>
            <div className="w-full h-max pl-16">
            <p className="text-white py-2 text-lg ">{tweet.tweet.text}</p>
            {tweet.tweet.image &&<img className="w-[90%] h-[75vh] my-2 aspect-square rounded-lg" src={tweet.tweet?.image} alt="" />}
            </div>
            <div className="flex w-[90%] pl-16 justify-between align-baseline">
                <p className="text-2xl flex gap-2 items-center text-gray-500">
                < FaRegComment/>
                    <span className="text-gray-500">2</span>
                </p>
                <p className="text-2xl flex gap-2 items-center text-gray-500">
                < FaRetweet/>
                    <span className="text-gray-500">200</span>
                </p>
                <p className="text-2xl flex gap-2 items-center text-gray-500">
                < IoIosHeartEmpty/>
                    <span className="text-gray-500">2.4M</span>
                </p>
                <p className="text-2xl flex gap-2 items-center text-gray-500">
                < MdOutlineFileUpload/>
                </p>
            </div>
    </div>
  )
}

export default TweetDisplay