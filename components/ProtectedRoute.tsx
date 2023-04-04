import {useRouter} from "next/router";
import React, {useEffect} from "react";
import {shallow} from "zustand/shallow";

import {LoadingPage} from "./ui/Loaders";

import useAuthStore from "@/store/auth";

const fromUnabled = ["/register"];

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
  const {user} = useAuthStore((state) => ({user: state.user, loading: state.loading}), shallow);
  const router = useRouter();

  useEffect(() => {
    const from = fromUnabled.includes(router.asPath) ? undefined : router.asPath;

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
