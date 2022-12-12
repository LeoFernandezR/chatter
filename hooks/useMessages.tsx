import {addDoc, collection, doc, onSnapshot, orderBy, query, Timestamp} from "firebase/firestore";
import React, {useEffect, useState} from "react";

import {db} from "../firebase/firebase";

type Props = {
  roomID?: string;
};

export interface Message {
  message: string;
  timestamp: string;
}

const useMessages = ({roomID}: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (message: string) => {
    if (!roomID) return;

    await addDoc(collection(db, "rooms", roomID, "messages"), {
      message: message,
      timestamp: Timestamp.now(),
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
