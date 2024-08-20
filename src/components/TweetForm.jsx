import { CiCirclePlus } from "react-icons/ci";
import { FaCircleNotch, FaRegSmile } from "react-icons/fa";
import { IoClose, IoImageOutline } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { PiChartBarHorizontal } from "react-icons/pi";

import EmojiPicker from "emoji-picker-react";
import { useRef, useState } from "react";
import { Tooltip } from "@chakra-ui/react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import toast from "react-hot-toast";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const TweetForm = () => {
  const [open, setOpen] = useState(false);
  const [tweetText, setTweetText] = useState("");
  const [tweetPic, setTweetPic] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [picURL, setPicURL] = useState("");
  const inputRef = useRef(null);
  

  const storage = getStorage(app);
  const db = getFirestore(app);
  const auth = getAuth();


//* Handling image upload
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setTweetPic(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

const uploadImage = async (image) => {
  try {
    const storageRef = ref(
      storage,
      `tweet_pics/${Math.random()}_${image.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, image);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          toast.error(error.message);
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

//* Creating a new tweet object
const createTweet = async (user, tweetContent) => {
  try {
    const newTweet = doc(collection(db, "tweets"));
    await setDoc(newTweet, {
      userid: user.uid,
      tweet: tweetContent,
      tweetId: newTweet.id,
      timestamp: new Date().getTime(),
    });
  } catch (error) {
    toast.error(error.message);
    console.error(error);
  }
};
//* Sending the tweet object together with the tweetImage if one exists
const sendTweet = async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (user) {
    try {
      let imageUrl = picURL;
      if (tweetPic) {
        imageUrl = await uploadImage(tweetPic);
        setPicURL(imageUrl);
      }

      setTweetText("");
      setTweetPic(null);
      setPicURL("");
      setPreviewURL("");
      await createTweet(user, { text: tweetText, image: imageUrl });
      toast.success("Tweet sent successfully");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }
};



//opening emojiPicker
  const handleSetOpen = () => {
    setOpen(!open);
  };


  // adding emojis
  const handleEmojiClick = (emojiData) => {
    const input = inputRef.current;
    const { selectionStart, selectionEnd } = input;

    const startText = tweetText.substring(0, selectionStart);
    const endText = tweetText.substring(selectionEnd);

    const updatedText = startText + emojiData.emoji + endText;
    setTweetText(updatedText);

    // Move caret position after the inserted emoji
    setTimeout(() => {
      input.selectionStart = input.selectionEnd = selectionStart + emojiData.emoji.length;
    }, 0);
  };

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
          ref={inputRef}
          onChange={(e) => setTweetText(e.target.value)}
          name="tweet"
          className="w-5/6 bg-transparent text-gray-400 text-xl outline-none py-4 px-2 resize-none placeholder:text-xl placeholder:text-gray-400"
          id=""
          placeholder="What's happening?"
        ></textarea>
      </div>
      {previewURL && (
        <div className=" ml-4 mb-4 w-[90%] h-max relative">
          <p
            onClick={() => {
              setTweetPic("");
              setPreviewURL("");
            }}
            className=" w-8 h-8 rounded-full bg-gray-900 text-xl flex items-center justify-center absolute cursor-pointer right-[2px] top-[2px] text-white"
          >
            <IoClose />
          </p>
          <img
            className="w-full h-[50vh] object-cover rounded-t-2xl"
            src={previewURL}
            alt="tweet-pic"
          />
        </div>
      )}
      <div className="flex ml-[90px] w-5/6 justify-between px-2">
        <div className="flex gap-4 w-1/2 h-max items-center relative">
          <input
            className="hidden"
            onChange={handleImageChange}
            type="file"
            name=""
            id="tweet-pic"
          />
          <Tooltip
            label="Media"
            openDelay={300}
            className="bg-gray-800 text-white rounded-md p-2"
          >
            <label className="cursor-pointer" htmlFor="tweet-pic">
              <IoImageOutline className="text-blue-500 font-normal text-[27px]" />
            </label>
          </Tooltip>
          <MdOutlineGifBox className="text-blue-500 font-normal text-[27px]" />
          <PiChartBarHorizontal className="text-blue-500 font-normal text-[27px]" />
          <Tooltip
            label="Emoji"
            openDelay={300}
            className="bg-gray-800 text-white rounded-md p-2"
          >
            <p>
              <FaRegSmile
                onClick={handleSetOpen}
                className="text-blue-500 cursor-pointer font-normal text-[27px]"
              />
            </p>
          </Tooltip>
          <EmojiPicker
            emojiStyle="twitter"
            onReactionClick={handleSetOpen}
            theme="dark"
            onEmojiClick={handleEmojiClick}
            style={{ position: "absolute", top: 50 }}
            open={open}
          />
        </div>
        <div className="flex gap-2 w-1/2 justify-end items-center">
          <FaCircleNotch className="text-gray-500 font-normal text-[27px]" />
          <CiCirclePlus className="text-blue-400 font-normal text-[27px]" />
          <button
            disabled={previewURL.length < 3 && tweetText.length < 1}
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
