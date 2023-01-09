import {useRouter} from "next/router";
import React, {useEffect} from "react";

import {useAuth} from "../context/AuthContext";

import Loader from "./pageStates/Loader";

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
  const {user} = useAuth();
  const router = useRouter();
  const fromUnabled = ["/register"];
  const from = fromUnabled.includes(router.asPath) ? undefined : {from: router.asPath};

  useEffect(() => {
    if (!user) {
      router.push({
        pathname: "/",
        query: from,
      });
    }
  }, [router, user]);

  return <>{user ? children : <Loader />}</>;
};

export default ProtectedRoute;
