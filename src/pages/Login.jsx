import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-svh w-full bg-black">
      <form className="border-zinc-200 flex items-center flex-col gap-4 border-2 w-[400px] h-[400px] rounded-2xl">
        <h2 className="text-5xl flex flex-col items-center text-zinc-50 mt-2">
          <FaXTwitter /> <span className="text-3xl font-semibold mt-2">Log In</span>
        </h2>
        <input
          className="p-2 rounded-xl w-[80%] border-none"
          type="email"
          placeholder="Enter your emial adrress"
        />
        <input
          className="p-2 rounded-xl w-[80%] border-none"
          type="password"
          placeholder="Enter your password"
        />
        <button className="w-[60%] p-2 rounded-lg bg-stone-50 border-none">
          Sign Up
        </button>
        <div className="flex gap-4 justify-center items-center w-[90%]">
        <p className="text-yellow-50 text-lg font-semibold">Don&apos;t have an account?</p>
        <Link className="text-blue-400 font- text-lg"  to="/sign-up">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
