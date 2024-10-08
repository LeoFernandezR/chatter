import {addDoc, collection, onSnapshot, orderBy, query, Timestamp} from "firebase/firestore";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import {db} from "../firebase/firebase";

import useAuthStore from "@/store/auth";

export interface Message {
  message: string;
  timestamp: string;
  username: string;
  userID: string;
}

const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  // const {user} = useAuth();
  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  const roomID = router.query.roomID as string;

  const sendMessage = async (message: string) => {
    if (!roomID) return;

    await addDoc(collection(db, "rooms", roomID, "messages"), {
      message: message,
      timestamp: Timestamp.now(),
      username: user?.username,
      userID: user?.uid,
    });
  };

  useEffect(() => {
    if (!roomID) return;
    const messageRef = collection(db, "rooms", roomID, "messages");
    const q = query(messageRef, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const newMessages: Message[] = [];

      querySnapshot.forEach((doc) => {
        newMessages.push(doc.data() as Message);
      });

      setMessages(newMessages);
    });

    return () => {
      unsub();
    };
  }, [roomID]);

  return {sendMessage, messages};
};

export default useMessages;
