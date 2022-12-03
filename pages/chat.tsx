import React from "react";

import {useAuth} from "../context/AuthContext";

const Chat = () => {
  const {user, logout} = useAuth();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-2 text-xl">
      <h1 className="text-5xl font-bold">Hi {user?.displayName || "there"}!</h1>
      <p className="text-2xl">This is a protected route</p>
      <button className="py-2 px-4 bg-stone-900 text-white rounded-lg" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Chat;
