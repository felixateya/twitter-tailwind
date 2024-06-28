/* eslint-disable react/prop-types */
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { createContext, useReducer } from "react";
import { app } from "../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

const AuthContext = createContext();

const initialState = {
  user: null,
  error: "",
  isLoading: false,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "signup":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: true,
      };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const auth = getAuth();
  const signup = async (email, password, name, navigate) => {
    const db = getFirestore(app);

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        name
      );
      const uid = userCredentials.user.uid;
      if (!email || !password || !name) {
        toast.error("Please fill in all fields");
      }
      const newUser = doc(collection(db, "users"));
      await setDoc(newUser, {
        username: name,
        email: email,
        userid: uid,
        timestamp: new Date().getTime(),
        profileImg: "",
      });
      toast.success("Signup successful");
      dispatch({ type: "signup", payload: userCredentials.user });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  const login = (email, password, navigate) => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;
        console.log(uid);
        console.log(userCredentials);
        toast.success("login successful");
        dispatch({ type: "login", payload: userCredentials.user });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };
  const signout = async (navigate) => {
    try {
      await signOut(auth);
      navigate("/login");
      console.log("success");
      toast.success("Successfully logged out");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        signup,
        login,
        signout,
      }}
    >
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
