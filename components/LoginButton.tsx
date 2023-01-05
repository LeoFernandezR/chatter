import {Icon} from "@iconify/react";
import React from "react";

import {useAuth} from "../context/AuthContext";

const LoginProviders = ["github", "google"] as const;

type LoginProvider = typeof LoginProviders[number];

interface Props {
  type: LoginProvider;
}

const LoginButton: React.FC<Props> = ({type}) => {
  const {loginWithGithub, loginWithGoogle} = useAuth();

  const config = {
    google: {
      icon: "ant-design:google-circle-filled",
      trigger: loginWithGoogle,
      text: "Login with Google",
    },
    github: {
      icon: "ant-design:github-filled",
      trigger: loginWithGithub,
      text: "Login with Github",
    },
  };

  return (
    <button
      className="flex items-center w-full gap-4 px-6 py-2 italic font-bold transition-colors duration-300 ease-in-out shadow-lg cursor-pointer rounded-2xl bg-baby-powder-800/40 hover:bg-orchid-crayola-500 focus:outline-none focus:bg-orchid-crayola-500 shadow-orchid-crayola-800 sm:text-2xl"
      onClick={config[type].trigger}
    >
      <Icon className="text-5xl" icon={config[type].icon} /> {config[type].text}
    </button>
  );
};

export default LoginButton;
