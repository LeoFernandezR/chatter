import {useAuth} from "../context/AuthContext";

export default function Home() {
  const {login} = useAuth();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-2 text-xl">
      <h1 className="text-5xl font-bold ">Plese login with your github!</h1>
      <button className="py-2 px-4 bg-stone-900 text-white rounded-lg" onClick={login}>
        Login with Github
      </button>
    </div>
  );
}
