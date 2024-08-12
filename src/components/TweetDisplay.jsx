
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import { useData } from "../hooks/useData";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Tooltip } from "@chakra-ui/react";


const TweetDisplay = ({ tweet }) => {
  const { fetchUser } = useData();
  const [user, setUser] = useState("");

  useEffect(() => {
    const getData = async () => {
      const userData = await fetchUser(tweet.userid);
      setUser(userData?.username || "");
    };

    getData();
  }, [tweet.userid, fetchUser]);

  return (
    <div className="flex w-full flex-col h-full p-2 border-b-[1px] border-b-gray-500">
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
      <Tooltip label="Reply" openDelay={300} className="bg-gray-800 text-white rounded-md p-2">
        <p className="text-2xl flex gap-2 items-center cursor-pointer text-gray-500">
          <FaRegComment />
          <span className="text-gray-500">2</span>
        </p>
      </Tooltip>
      <Tooltip label="Repost" openDelay={300} className="bg-gray-800 text-white rounded-md p-2">
        <p className="text-2xl flex gap-2 cursor-pointer items-center text-gray-500">
          <FaRetweet />
          <span className="text-gray-500">200</span>
        </p>
      </Tooltip>
      <Tooltip  label="Like"  openDelay={300} className="bg-gray-800 text-white rounded-md p-2">
        <p className="text-2xl flex gap-2 cursor-pointer items-center text-gray-500">
          <IoIosHeartEmpty />
          <span className="text-gray-500">2.4M</span>
        </p>
      </Tooltip>
      <Tooltip label="Share" openDelay={300} className="bg-gray-800 text-white rounded-md p-2">
        <p className="text-2xl flex gap-2 cursor-pointer items-center text-gray-500">
          <MdOutlineFileUpload />
        </p>
      </Tooltip>
      </div>
    </div>
  );
}

TweetDisplay.propTypes = {
  tweet: PropTypes.shape({
    userid: PropTypes.string.isRequired,
    tweet: PropTypes.shape({
      text: PropTypes.string.isRequired,
      image: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default TweetDisplay;
