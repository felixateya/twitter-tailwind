/* eslint-disable react/prop-types */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
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
  const [refresh, setRefresh] = useState(false);
  const [picURL, setPicURL] = useState("");
  const [tweetList, setTweetList] = useState([]);
  const [previewURL, setPreviewURL] = useState("");

  const auth = getAuth();
  const storage = getStorage(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const queryDocument = query(
            collection(db, "users"),
            where("userid", "==", user.uid)
          );
          const querySnapshot = await getDocs(queryDocument);
          querySnapshot.forEach((userDoc) => {
            const username = userDoc.data().username;
            setUser(username);
            console.log(username);
          });
        } catch (error) {
          console.error(error);
          toast.error("Failed to fetch user data");
        }
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [auth, db]);

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

  const fetchTweets = useCallback(() => {
    const queryTweets = query(
      collection(db, "tweets"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(queryTweets, (snapshot) => {
      const tweetItem = [];
      snapshot.forEach((tweetDoc) => {
        tweetItem.push(tweetDoc.data());
      });
      setTweetList(tweetItem);
    }, (error) => {
      console.error("Error fetching tweets:", error);
    });

    return unsubscribe; // To unsubscribe when the component unmounts
  }, [db]);

  useEffect(() => {
    const unsubscribe = fetchTweets();
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [fetchTweets, refresh]);

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

  const createTweet = async (user, tweetContent) => {
    try {
      const newTweet = doc(collection(db, "tweets"));
      await setDoc(newTweet, {
        userid: user.uid,
        tweet: tweetContent,
        tweetId: newTweet.id,
        timestamp: new Date().getTime(),
      });
      toast.success("Tweet sent successfully");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

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
        await createTweet(user, { text: tweetText, image: imageUrl });
        setRefresh((prev) => !prev); // Toggle refresh to trigger useEffect
        setTweetText("");
        setTweetPic(null);
        setPicURL("");
        setPreviewURL("");
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      }
    }
  };

  return (
    <DataContext.Provider
      value={{
        user,
        sendTweet,
        tweet: { text: tweetText, image: picURL },
        setTweetText,
        tweetText,
        setTweetPic,
        tweetPic,
        tweetList,
        previewURL,
        setPreviewURL,
        handleImageChange,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
