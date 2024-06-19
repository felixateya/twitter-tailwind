import { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = (event) => {
    event.preventDefault();
    signup(email, password, name, navigate);
  };
  return (
    <div className="flex h-svh w-full bg-white">
      <div className="w-[50%] h-full bg-[url(https://twitter-mwitu.vercel.app/Images/defcover.jpg)] bg-cover bg-right bg-no-repeat"></div>
      <form id="signup"
        onSubmit={handleSignup}
        className="border-zinc-200 flex items-center justify-center flex-col gap-4 border-2 w-[50%] h-full rounded-2xl"
      >
        <h2 className="text-5xl flex flex-col items-center text-black mt-2 text-center">
          <FaXTwitter />{" "}
          <span className="text-3xl font-semibold mt-2">Create Account</span>
        </h2>
        <input
          className="p-4 rounded-xl w-[80%] bg-yellow-50 border-slate-500 border-[1px]"
          type="text"
          id="name"
          placeholder="Enter you name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-4 rounded-xl w-[80%] bg-yellow-50 border-slate-500 border-[1px]"
          type="text"
          id="email"
          placeholder="Enter your emial adrress"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-4 rounded-xl w-[80%] bg-yellow-50 border-slate-500 border-[1px]"
          type="text"
          id="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-[60%] p-2 rounded-lg bg-blue-600 font-semibold text-lg text-white border-none hover:bg-blue-800 transition duration-200 ease-in-out"
        >
          Sign Up
        </button>
        <div className="flex gap-4 justify-center items-center w-[100%]">
          <p className="text-black font-semibold text-lg">
            Already have an account?
          </p>
          <Link
            className="text-blue-600 font-semibold text-lg hover:text-blue-400 transition duration-200 ease-in-out"
            to="/login"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
