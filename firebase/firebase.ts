// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, GithubAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_Kb0-vFupEYVHPfzwl_UKWUOTVIe8y7s",
  authDomain: "chatter-aa8f1.firebaseapp.com",
  projectId: "chatter-aa8f1",
  storageBucket: "chatter-aa8f1.appspot.com",
  messagingSenderId: "935599753855",
  appId: "1:935599753855:web:b73fc746b09a6eee550d4a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const githubProvider = new GithubAuthProvider();
