import { MdOutlineFileUpload } from "react-icons/md"
import UserProfile from "../components/UserProfile"
import { useData } from "../hooks/useData"
import { IoIosHeartEmpty } from "react-icons/io"
import { FaRegComment, FaRetweet } from "react-icons/fa6"
import { useParams } from "react-router-dom"





const Profile = () => {
  const {tweetList, user}= useData()
  const{userId} = useParams()
  const myTweets = tweetList.filter((tweet)=> tweet.userid === userId)
console.log(userId)
  return (
    <div className="h-screen w-full">
    <UserProfile/>
    {myTweets.map((tweet)=>(
      <div key={tweet.tweetId} className="mt-4">
      <div className="flex w-full flex-col h-full p-2 pb-6 border-b-[1px] border-b-gray-500">
      <div className="w-max flex gap-2">
        <img className="w-16 h-16 rounded-full" src="/prof-image.jpg" alt="" />
        <div className="flex gap-2 items-center">
          <p className="text-white font-semibold text-xl">{user}</p>
          <p className="text-gray-500 text-xl">{`@${user}`}</p>
        </div>
      </div>
      <div className="w-full h-max pl-16">
        <p className="text-white py-2 text-lg ">{tweet.tweet.text}</p>
        {tweet.tweet.image && (
          <img
            className="w-full h-[70vh] my-2 aspect-auto rounded-xl"
            src={tweet.tweet?.image}
            alt=""
          />
        )}
      </div>
      <div className="flex w-[90%] pl-16 justify-between align-baseline">
        <p className="text-2xl flex gap-2 items-center text-gray-500">
          <FaRegComment />
          <span className="text-gray-500">2</span>
        </p>
        <p className="text-2xl flex gap-2 items-center text-gray-500">
          <FaRetweet />
          <span className="text-gray-500">200</span>
        </p>
        <p className="text-2xl flex gap-2 items-center text-gray-500">
          <IoIosHeartEmpty />
          <span className="text-gray-500">2.4M</span>
        </p>
        <p className="text-2xl flex gap-2 items-center text-gray-500">
          <MdOutlineFileUpload />
        </p>
      </div>
    </div>
      </div>
    ))}
    </div>
  )
}

export default Profile