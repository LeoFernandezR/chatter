import {useRouter} from "next/router";
import React, {useEffect} from "react";

import {useAuth} from "../context/AuthContext";

import {LoadingPage} from "./ui/Loaders";

const fromUnabled = ["/register"];

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
  const {user} = useAuth();
  const router = useRouter();

  useEffect(() => {
    const from = fromUnabled.includes(router.asPath) ? undefined : router.asPath;

    console.log({from, route: router.pathname, aspath: router.asPath});

    if (!user) {
      router.push({
        pathname: "/",
        query: {from},
      });
    }
  }, [router, user]);

  return <>{user ? children : <LoadingPage />}</>;
};

export default ProtectedRoute;
