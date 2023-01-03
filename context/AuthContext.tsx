import {onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {useRouter} from "next/router";
import React, {useState, createContext, useEffect, useContext} from "react";

import {auth, githubProvider, googleProvider} from "../firebase/firebase";

interface User {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
}

interface ContextValues {
  user: User | null;
  loginWithGithub: VoidFunction;
  loginWithGoogle: VoidFunction;
  logout: VoidFunction;
}

const AuthContext = createContext<ContextValues>({
  user: null,
  loginWithGithub: () => {},
  loginWithGoogle: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loginWithGithub = async () => {
    await signInWithPopup(auth, githubProvider);
    if (router.query && router.query.from && typeof router.query.from === "string") {
      router.push(router.query.from);
    } else {
      router.push("/chat");
    }
  };
  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    if (router.query && router.query.from && typeof router.query.from === "string") {
      router.push(router.query.from);
    } else {
      router.push("/chat");
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{user, loginWithGithub, loginWithGoogle, logout}}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
