import {AiOutlineGithub, AiOutlineGoogle} from "react-icons/ai";

import {useAuth} from "../context/AuthContext";

export default function Home() {
  const {loginWithGithub, loginWithGoogle} = useAuth();

  return (
    <section className="px-6 py-8 bg-dark-blue h-screen min-h-screen text-white">
      <div className="space-y-8">
        <h1 className="text-6xl font-bold text-center">
          Welcome to <span className="text-light-teal">Chatter</span>
        </h1>
        <div className="max-w-lg rounded-xl bg-gray-blue px-6 py-4 space-y-4 shadow-md sm:m-auto">
          <h1 className="text-4xl font-bold text-center text-light-teal">Login to your account</h1>
          <ul className="bg-light-cyan text-dark-blue p-4 rounded-xl space-y-4 text-lg">
            <li>
              <span className="text-light-teal text-xl align-middle pr-2">*</span>Get access to
              chatter with your github account
            </li>
            <li>
              <span className="text-light-teal text-xl align-middle pr-2">*</span>Create chat rooms,
              chat with your friends or make new ones!
            </li>
          </ul>
          <div className="flex flex-col justify-center gap-2">
            <button
              className="py-2 px-4 bg-black cursor-pointer hover:bg-light-teal transition-colors duration-200 text-light-cyan rounded-lg font-bold flex items-center gap-2 text-xl"
              onClick={loginWithGithub}
            >
              <AiOutlineGithub className="text-2xl" /> Login with Github
            </button>
            <button
              className="py-2 px-4 bg-slate-200 cursor-pointer hover:bg-light-teal transition-colors duration-200 text-black rounded-lg font-bold flex items-center gap-2 text-xl"
              onClick={loginWithGoogle}
            >
              <AiOutlineGoogle className="text-2xl" /> Login with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
