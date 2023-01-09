import React from "react";

import LoginButton from "./LoginButton";

type Props = {};

const Login = (props: Props) => {
  return (
    <>
      <h3 className="text-xl font-medium text-center sm:text-2xl sm:text-start sm:ml-6">
        Login to your account
      </h3>
      <ul className="space-y-3">
        <li>
          <LoginButton type="google" />
        </li>
        <li>
          <LoginButton type="github" />
        </li>
      </ul>
    </>
  );
};

export default Login;
