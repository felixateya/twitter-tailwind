import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex items-center justify-center h-svh w-full bg-black">
      <form className="border-zinc-200 flex items-center flex-col gap-4 border-2 w-[400px] h-[400px] rounded-2xl">
        <h2 className="text-5xl flex flex-col items-center text-zinc-50 mt-2 text-center">
          <FaXTwitter /> <span className="text-3xl font-semibold mt-2">Create Account</span>
        </h2>
        <input
          className="p-2 rounded-xl w-[80%] border-none"
          type="text"
          placeholder="Enter you name"
        />
        <input
          className="p-2 rounded-xl w-[80%] border-none"
          type="text"
          placeholder="Enter your emial adrress"
        />
        <input
          className="p-2 rounded-xl w-[80%] border-none"
          type="text"
          placeholder="Enter your password"
        />
        <button className="w-[60%] p-2 rounded-lg bg-stone-50 border-none">
          Sign Up
        </button>
        <div className="flex gap-4 justify-center items-center w-[100%]">
        <p className="text-yellow-50 font-semibold text-lg">Already have an account?</p>
        <Link className="text-blue-400 font-semibold text-lg" to="/login">Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
