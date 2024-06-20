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
    <div className="flex h-svh w-full bg-black">
      <div className="w-[50%] h-full bg-[url(https://twitter-mwitu.vercel.app/Images/defcover.jpg)] bg-cover bg-right bg-no-repeat"></div>
      <form id="signup"
        onSubmit={handleSignup}
        className="flex items-center justify-center flex-col gap-4 w-[50%] h-full"
      >
        <h2 className="text-5xl flex flex-col items-center text-white mt-2 text-center">
          <FaXTwitter />{" "}
          <span className="text-3xl font-semibold mt-2">Create Account</span>
        </h2>
        <input
          className="p-4 rounded-xl w-[80%] bg-transparent text-white placeholder:text-white border-slate-50 border-[1px]"
          type="text"
          id="name"
          placeholder="Enter you name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-4 rounded-xl w-[80%] bg-transparent text-white placeholder:text-white border-slate-50 border-[1px]"
          type="text"
          id="email"
          placeholder="Enter your emial adrress"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-4 rounded-xl w-[80%] bg-transparent text-white placeholder:text-white border-slate-50 border-[1px]"
          type="text"
          id="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-[60%] p-2 rounded-lg bg-white font-semibold text-lg text-black border-none hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out"
        >
          Sign Up
        </button>
        <div className="flex gap-4 justify-center items-center w-[100%]">
          <p className="text-white font-semibold text-lg">
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
