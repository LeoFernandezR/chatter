import React, {createContext, useContext, useState} from "react";

import {LoadingPage} from "../components/ui/Loaders";

import useFirebaseAuth from "./hooks/useFirebaseAuth";
import useUserMetadata, {UserMetadata} from "./hooks/useUserMetadata";
1;

// type Roles = "admin" | "user";

// type AuthState = "login" | "register";

interface ContextValues {
  user: UserMetadata | null;
  loginWithGithub: VoidFunction;
  loginWithGoogle: VoidFunction;
  logout: VoidFunction;
  saveUsername: ({
    username,
    userId,
  }: {
    username: string;
    userId: UserMetadata["uid"];
  }) => Promise<void>;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<ContextValues>(null!);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
  const [loading, setLoading] = useState(true);
  const {firebaseUser, loginWithGithub, loginWithGoogle, logout} = useFirebaseAuth(setLoading);
  const {saveUsername, user} = useUserMetadata(firebaseUser, setLoading);

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGithub,
        loginWithGoogle,
        logout,
        loading,
        isAdmin,
        saveUsername,
      }}
    >
      {loading ? <LoadingPage /> : children}
    </AuthContext.Provider>
  );
};
