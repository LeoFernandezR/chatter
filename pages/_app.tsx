import "@fontsource/poppins";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400-italic.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import "../styles/globals.css";

import type {AppProps} from "next/app";

import {useRouter} from "next/router";
import {ReactElement, ReactNode} from "react";
import {NextPage} from "next";

import ProtectedRoute from "../components/ProtectedRoute";
import {AuthContextProvider} from "../context/AuthContext";

const noAuthRequired = ["/"];

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({Component, pageProps}: AppPropsWithLayout) {
  const router = useRouter();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>{getLayout(<Component {...pageProps} />)}</ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}
