import {onSnapshot, query, collection, setDoc, doc, Timestamp, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";

import {db} from "../firebase/firebase";

export interface Room {
  id: string;
  name: string;
  timestamp: string;
}

const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const createRoom = async (roomName: string) => {
    const docSnap = await getDoc(doc(db, "rooms", roomName.toLowerCase()));

    if (docSnap.exists()) {
      throw new Error("This Room already exists");
    }

    await setDoc(doc(db, "rooms", roomName.toLowerCase()), {
      name: roomName,
      id: roomName.toLowerCase(),
      timestamp: Timestamp.now(),
    });
  };

  useEffect(() => {
    const q = query(collection(db, "rooms"));
    const unsub = onSnapshot(q, (querySnapshots) => {
      const newRooms: Room[] = [];

      querySnapshots.forEach((doc) => {
        newRooms.push(doc.data() as Room);
      });

      setRooms(newRooms);
    });

    return () => {
      unsub();
    };
  }, []);

  return {rooms, createRoom};
};

export default useRooms;
