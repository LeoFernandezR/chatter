import "../styles/globals.css";
import "@fontsource/poppins";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/400-italic.css";
import "@fontsource/poppins/700.css";

import type {AppProps} from "next/app";

import {useRouter} from "next/router";

import {AuthContextProvider} from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

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
