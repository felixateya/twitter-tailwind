import { CiCirclePlus } from "react-icons/ci";
import { FaCircleNotch, FaRegSmile } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { PiChartBarHorizontal } from "react-icons/pi";
import { useData } from "../hooks/useData";

const TweetForm = () => {
  const {
    setTweetText,
    tweetText,
    sendTweet,
    setPreviewURL,
    handleImageChange,
    previewURL,
  } = useData();
  return (
    <form
      onSubmit={sendTweet}
      className="w-full transition duration-[600ms] h-max border-b-8 pb-2 border-b-gray-800"
    >
      <div className="flex w-full h-[60%] p-2">
        <img
          className="w-16 h-16 rounded-[50%] border-gray-500"
          src="/prof-image.jpg"
          alt=""
        />

        <textarea
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
          name="tweet"
          className="w-5/6 bg-transparent text-gray-400 text-xl outline-none py-4 px-2 resize-none placeholder:text-xl placeholder:text-gray-400"
          id=""
          placeholder="What's happening?"
        ></textarea>
      </div>
      {previewURL && (
        <div className=" ml-4 mb-4 w-[90%] h-[300px] relative">
          <p
            onClick={() => setPreviewURL("")}
            className=" w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center absolute cursor-pointer right-3 top-1 text-white"
          >
            X
          </p>
          <img
            className="w-full h-full rounded-md"
            src={previewURL}
            alt="tweet-pic"
          />
        </div>
      )}
      <div className="flex ml-[90px] w-5/6 justify-between px-2">
        <div className="flex gap-4 w-1/2 items-center ">
          <input
            className="hidden"
            onChange={handleImageChange}
            type="file"
            name=""
            id="tweet-pic"
          />
          <label className="cursor-pointer" htmlFor="tweet-pic">
            <IoImageOutline className="text-blue-500 font-normal text-[27px]" />
          </label>
          <MdOutlineGifBox className="text-blue-500 font-normal text-[27px]" />
          <PiChartBarHorizontal className="text-blue-500 font-normal text-[27px]" />
          <FaRegSmile className="text-blue-500 font-normal text-[27px]" />
        </div>
        <div className="flex gap-2 w-1/2 justify-end items-center">
          <FaCircleNotch className="text-gray-500 font-normal text-[27px]" />
          <CiCirclePlus className="text-blue-400 font-normal text-[27px]" />
          <button
            disabled={previewURL.length < 3 && tweetText.length < 3}
            className="bg-blue-600 py-2 px-6 text-white w-max rounded-[30px] disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
