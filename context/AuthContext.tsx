import {onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {useRouter} from "next/router";
import React, {useState, createContext, useEffect, useContext} from "react";

import {auth, githubProvider} from "../firebase/firebase";

interface User {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
}

interface ContextValues {
  user: User | null;
  login: VoidFunction;
  logout: VoidFunction;
}

const AuthContext = createContext<ContextValues>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = () => {
    signInWithPopup(auth, githubProvider);
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
        router.push("/chat");
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
