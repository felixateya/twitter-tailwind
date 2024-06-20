import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
const Login = () => {
const {login} = useAuth()
const navigate = useNavigate()
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const handleLogin  = (event)=>{
  event.preventDefault()
  login(email, password, navigate)
}
  return (
    <div className="flex h-svh w-full bg-black">
      <form onSubmit={handleLogin} id="login-form" className="flex items-center justify-center flex-col gap-4 w-[50%] h-full">
        <h2 className="text-5xl flex flex-col items-center text-white mt-2">
          <FaXTwitter /> <span className="text-3xl font-semibold mt-2">Log In</span>
        </h2>
        <input
          className="p-4 rounded-xl w-[80%] text-white placeholder:text-white bg-transparent border-slate-500 border-[1px]"
          type="email"
          id="email"
          autoComplete="username" 
          onChange={(e)=> setEmail(e.target.value)}
          placeholder="Enter your emial adrress"
        />
        <input
        id="password"
          className="p-4 rounded-xl text-white placeholder:text-white w-[80%] bg-transparent active:bg-transparent border-slate-500 border-[1px]"
          type="password"
          autoComplete="current-password"
          onChange={(e)=> setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button type="submit" className="w-[60%] p-2 rounded-lg bg-white text-lg font-semibold text-black border-none hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out">
          Sign Up
        </button>
        <div className="flex gap-4 justify-center items-center w-[90%]">
        <p className="text-white text-lg font-semibold">Don&apos;t have an account?</p>
        <Link className="text-blue-600 font- text-lg hover:text-blue-400 transition duration-200 ease-in-out"  to="/signup">Sign Up</Link>
        </div>
      </form>
      <div className="w-[50%] h-full bg-[url(https://twitter-mwitu.vercel.app/Images/defcover.jpg)] bg-cover bg-right bg-no-repeat"></div>
    </div>
  );
};

export default Login;
