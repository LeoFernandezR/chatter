import "@fontsource/poppins";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400-italic.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import "../styles/globals.css";

import type {AppProps} from "next/app";

import {useRouter} from "next/router";

import ProtectedRoute from "../components/ProtectedRoute";
import {AuthContextProvider} from "../context/AuthContext";

const noAuthRequired = ["/"];

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();

  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}
