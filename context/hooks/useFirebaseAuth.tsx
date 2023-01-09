import {User, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import React, {useEffect, useState} from "react";

import {auth, githubProvider, googleProvider} from "../../firebase/firebase";

const useFirebaseAuth = (setLoading: (val: boolean) => void) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  const loginWithGithub = async () => {
    await signInWithPopup(auth, githubProvider);
  };
  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {firebaseUser, loginWithGithub, loginWithGoogle, logout};
};

export default useFirebaseAuth;
