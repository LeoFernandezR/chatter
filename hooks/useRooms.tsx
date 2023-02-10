import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import {useEffect, useState} from "react";

import {db} from "../firebase/firebase";

export interface Room {
  id: string;
  name: string;
  timestamp: string;
}
type Rooms = Room[];

const useRooms = () => {
  const [rooms, setRooms] = useState<Rooms>([]);

  const createRoom = async (roomName: Room["name"]) => {
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

  const deleteRoom = async (id: Room["id"]) => {
    const q = query(collection(db, "rooms", id, "messages"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (_doc) => {
      const docId = _doc.id;
      const docRef = doc(db, "rooms", id, "messages", docId);

      await deleteDoc(docRef);
    });

    await deleteDoc(doc(db, "rooms", id));
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

  return {rooms, createRoom, deleteRoom};
};

export default useRooms;
