import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
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

type ProvidersId = "google.com" | "github.com";

const getProviderById = (id: ProvidersId) => {
  const providers = {
    [GithubAuthProvider.PROVIDER_ID]: githubProvider,
    [GoogleAuthProvider.PROVIDER_ID]: googleProvider,
  };

  return providers[id];
};

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loginWithProvider = async (provider: GithubAuthProvider | GoogleAuthProvider) => {
    try {
      await signInWithPopup(auth, provider);
      if (router.query && router.query.from && typeof router.query.from === "string") {
        router.push(router.query.from);
      } else {
        router.push("/chat");
      }
    } catch (error: any) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const oldCredential = error.credential;
        const email = error.customData.email;

        const [recommendMethod] = await fetchSignInMethodsForEmail(auth, email).catch((err) => {
          console.error(err);

          return [];
        });

        const provider = getProviderById(recommendMethod as ProvidersId);

        const {user} = await signInWithPopup(auth, provider);

        await linkWithCredential(user, oldCredential);
      }
    }
  };

  const loginWithGithub = async () => {
    await loginWithProvider(githubProvider);
  };

  const loginWithGoogle = async () => {
    await loginWithProvider(googleProvider);
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
