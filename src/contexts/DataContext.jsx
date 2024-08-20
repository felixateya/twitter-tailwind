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
} from "firebase/firestore";
import { createContext, useEffect, useState, useCallback } from "react";
import { app } from "../firebase";


const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tweetList, setTweetList] = useState([]);
  const [error, setError] = useState("");

  const auth = getAuth();
  const theUserId = auth.currentUser?.uid
  
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
  

  return (
    <DataContext.Provider
      value={{
      user,
        fetchUser,
        tweetList,
        error,
        theUserId
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
