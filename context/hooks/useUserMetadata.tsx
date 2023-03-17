import {User} from "firebase/auth";
import {collection, doc, getDoc, getDocs, query, setDoc, where} from "firebase/firestore";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import {db} from "../../firebase/firebase";

type Roles = "admin" | "user";

export interface UserMetadata {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  role: Roles;
  username: string | null;
}

const RedirectRoutes = ["/", "/register"];

const usernameExists = async (username: string) => {
  const q = query(collection(db, "users"), where("usernameCompare", "==", username.toLowerCase()));

  const querySnap = await getDocs(q);

  return !querySnap.empty;
};

const useUserMetadata = (firebaseUser: User | null, setLoading: (val: boolean) => void) => {
  const [user, setUser] = useState<UserMetadata | null>(null);
  const router = useRouter();

  const redirect = async () => {
    if (router.query && router.query.from && typeof router.query.from === "string") {
      await router.push(router.query.from);
    } else if (RedirectRoutes.includes(router.pathname)) {
      await router.push("/chat");
    }
  };

  const saveUsername = async ({username, userId}: {username: string; userId: string}) => {
    if (!firebaseUser) return;
    const usernameTaken = await usernameExists(username);

    if (usernameTaken) {
      throw new Error("username already taken...");
    }
    setLoading(true);
    const docRef = doc(db, "users", userId);

    await setDoc(docRef, {
      role: "user",
      username,
      usernameCompare: username.toLowerCase(),
    });

    setUser({
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      uid: firebaseUser.uid,
      username,
      role: "user",
    });

    await redirect();
    setLoading(false);
  };

  const getUserMetadata = async () => {
    if (!firebaseUser) return setUser(null);
    setLoading(true);
    const docSnap = await getDoc(doc(db, "users", firebaseUser.uid));

    if (docSnap.exists()) {
      const {role, username} = docSnap.data() as {role: Roles; username: UserMetadata["username"]};

      setUser({
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        uid: firebaseUser.uid,
        role,
        username,
      });

      await redirect();

      return setLoading(false);
    }

    setUser({
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      uid: firebaseUser.uid,
      role: "user",
      username: null,
    });

    if (typeof router.query.from === "string") {
      await router.push({
        pathname: "/register",
        query: {from: router.query.from.replace("/", "")},
      });

      return setLoading(false);
    }
    await router.push({
      pathname: "/register",
    });

    return setLoading(false);
  };

  useEffect(() => {
    getUserMetadata();
  }, [firebaseUser]);

  return {user, saveUsername};
};

export default useUserMetadata;
