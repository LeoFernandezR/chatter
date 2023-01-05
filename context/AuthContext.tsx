import {User, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {useRouter} from "next/router";
import React, {createContext, useContext, useEffect, useState} from "react";

import {auth, db, githubProvider, googleProvider} from "../firebase/firebase";
1;

type Roles = "admin" | "user";
interface IUser {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  role: Roles;
}

interface ContextValues {
  user: IUser | null;
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
  const [_user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loginWithGithub = async () => {
    await signInWithPopup(auth, githubProvider);
  };
  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const handleAuth = async (user: User) => {
    setLoading(true);
    const docSnap = await getDoc(doc(db, "users", user.uid));

    const data = docSnap.data() as {role?: Roles};

    if (!data?.role) {
      await setDoc(doc(db, "users", user.uid), {
        role: "user",
      });
    }

    setUser({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: data?.role || "user",
    });

    if (router.query && router.query.from && typeof router.query.from === "string") {
      await router.push(router.query.from);
    } else {
      await router.push("/chat");
    }
    setLoading(false);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        handleAuth(user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{user: _user, loginWithGithub, loginWithGoogle, logout}}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
