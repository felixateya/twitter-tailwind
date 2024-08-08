/* eslint-disable react/prop-types */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { createContext, useEffect, useState, useCallback } from "react";
import { app } from "../firebase";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tweetText, setTweetText] = useState("");
  const [tweetPic, setTweetPic] = useState(null);
  // const [refresh, setRefresh] = useState(false);
  const [picURL, setPicURL] = useState("");
  const [tweetList, setTweetList] = useState([]);
  const [previewURL, setPreviewURL] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth();
  const theUserId = auth.currentUser?.uid
  const storage = getStorage(app);
  const db = getFirestore(app);
//* fetching userData based on userid
  const fetchUser = async (userid) => {
    try {
      if (!userid) {
        throw new Error("User ID is required");
      }

      const userDocRef = doc(db, "users", userid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  
//* fetching logged in user's data
  useEffect(() => {
    const getUser = async () => {
      onAuthStateChanged(auth, async (user) => {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        setUser(userData.username);
      });
    };
    getUser();
  }, [auth, db]);

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

  //* fetching all tweets from firestore database
  const fetchTweets = useCallback(() => {
    const queryTweets = query(
      collection(db, "tweets"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(
      queryTweets,
      (snapshot) => {
        const tweetItem = [];
        snapshot.forEach((tweetDoc) => {
          tweetItem.push(tweetDoc.data());
        });
        setTweetList(tweetItem);
      },
      (error) => {
        console.error("Error fetching tweets:", error);
        setError("Error fecthing Tweets");
      }
    );

    return unsubscribe; // To unsubscribe when the component unmounts
  }, [db]);

  useEffect(() => {
    const unsubscribe = fetchTweets();
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [fetchTweets]);
//* Handling image upload to firebase storage
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
      setError("Error uploading image");
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
        setError("Error sending tweet");
      }
    }
  };

  return (
    <DataContext.Provider
      value={{
      user,
        fetchUser,
        sendTweet,
        // tweet: { text: tweetText, image: picURL },
        setTweetText,
        tweetText,
        setTweetPic,
        tweetPic,
        tweetList,
        previewURL,
        setPreviewURL,
        handleImageChange,
        error,
        theUserId
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
