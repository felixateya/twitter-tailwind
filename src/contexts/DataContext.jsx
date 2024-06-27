/* eslint-disable react/prop-types */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
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
  const [tweetList, setTweetList] = useState([])

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
      setRefresh((prev) => !prev);
      setTweetText("");
      setTweetPic(null);
      setPicURL("");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const sendTweet = useCallback(
    async (e) => {
      e.preventDefault();

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            let imageUrl = picURL;
            if (tweetPic) {
              imageUrl = await uploadImage(tweetPic);
              setPicURL(imageUrl);
            }
            await createTweet(user, { text: tweetText, image: imageUrl });
          } catch (error) {
            console.error(error);
          }
        }
      });
    },[auth, createTweet, picURL, tweetPic, tweetText, uploadImage])
    





  const fetchTweets = useCallback(async()=>{
    try{
      let tweetItem = []
      const queryTweets = query(
        collection(db, 'tweets')
      )
      const tweetSnapshot = await getDocs(queryTweets)

      tweetSnapshot.forEach((tweetDoc)=>{
        tweetItem.push({...tweetDoc.data()})
      })
      setTweetList(tweetItem)
    } 
    catch(error){
      console.error(error);
    }
  },[db])
  useEffect(()=>{
    fetchTweets()
  },[fetchTweets, refresh])

  return (
    <DataContext.Provider
      value={{
        user,
        sendTweet,
        tweet: { text: tweetText, image: picURL },
        setTweetText,
        setTweetPic,
        tweetPic,
        tweetList
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };