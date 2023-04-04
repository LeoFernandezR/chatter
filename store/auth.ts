import {Unsubscribe, User, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {collection, doc, getDoc, getDocs, query, setDoc, where} from "firebase/firestore";
import Router from "next/router";
import {create} from "zustand";

import {auth, db, githubProvider, googleProvider} from "@/firebase/firebase";

interface ChatterUser {
  displayName: User["displayName"];
  photoURL: User["photoURL"];
  uid: User["uid"];
  username: string | null;
}

interface AuthStore {
  user: ChatterUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
  saveUsername({username, uid}: {username: string; uid: string}): Promise<void>;
  handleAuthStateChange(): Unsubscribe;
}

const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  loading: true,
  signInWithGoogle: async () => {
    await signInWithPopup(auth, googleProvider);
  },
  signInWithGithub: async () => {
    await signInWithPopup(auth, githubProvider);
  },
  signOut: async () => {
    await signOut(auth);
  },
  handleAuthStateChange: () => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return set({user, loading: false});
      }
      set({loading: true});
      const data = await getUserData(user);

      //handle is the username isnt created
      if (!data) {
        set({
          user: {
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
            username: null,
          },
        });

        // if there is Router.query.from
        if (Router.query && Router.query.from && typeof Router.query.from === "string") {
          await Router.push({
            pathname: "/register",
            query: {from: Router.query.from},
          });

          return set({loading: false});
        }

        await Router.push("/register");

        return set({loading: false});
      }
      // handle if there is an username
      const {username} = data;

      set({
        user: {
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          username: username,
        },
      });

      await handleRedirect();

      return set({loading: false});
    });
  },
  saveUsername: async ({username, uid}: {username: string; uid: string}) => {
    const usernameTaken = await usernameExists(username);

    if (usernameTaken) {
      throw new Error("Username already taken...");
    }

    const docRef = doc(db, `users/${uid}`);

    await setDoc(docRef, {
      username,
      usernameCompare: username.toLowerCase(),
    });

    set((state) => {
      if (!state.user) {
        return state;
      }

      return {
        user: {
          ...state.user,
          username,
        },
      };
    });

    await handleRedirect();
    // set({loading: false});
  },
}));

async function usernameExists(username: string) {
  const q = query(collection(db, "users"), where("usernameCompare", "==", username.toLowerCase()));

  const querySnap = await getDocs(q);

  return !querySnap.empty;
}
async function getUserData(user: User) {
  const docSnap = await getDoc(doc(db, `users/${user.uid}`));

  return docSnap.exists() ? (docSnap.data() as {username: string}) : null;
}

async function handleRedirect() {
  const RedirectRoutes = ["/", "/register"];

  if (Router.query && Router.query.from && typeof Router.query.from === "string") {
    await Router.push(Router.query.from);
  } else if (RedirectRoutes.includes(Router.pathname)) {
    await Router.push("/chat");
  }
}

export default useAuthStore;
