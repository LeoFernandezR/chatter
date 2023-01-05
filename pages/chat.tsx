import Link from "next/link";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";

import RoomMessages from "../components/RoomMessages";
import {useAuth} from "../context/AuthContext";
import useRooms from "../hooks/useRooms";

const Chat = () => {
  const [roomName, setRoomName] = useState("");
  const {logout} = useAuth();
  const {query, push} = useRouter();
  const {createRoom, rooms, deleteRoom} = useRooms();

  useEffect(() => {
    if (typeof query.roomID !== "string") return;
    if (!rooms.find((room) => room.id === query.roomID)) {
      push("/chat");
    }
  }, [rooms, push, query.roomID]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2 text-xl">
      <div className="flex flex-col items-center justify-center flex-1">
        <div>
          <h1 className="text-3xl">Rooms</h1>
          <ul>
            {rooms.map((room) => (
              <li key={room.timestamp} className="flex justify-between">
                <Link
                  className={`${room.id === query.roomID ? "font-bold underline" : ""}`}
                  href={`/chat?roomID=${room.id}`}
                >
                  {room.name}
                </Link>
                <button className="text-red-500" onClick={() => deleteRoom(room.id)}>
                  X
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
            <input
              className="px-2 border border-black rounded"
              placeholder="create room"
              type="text"
              value={roomName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRoomName(e.target.value);
              }}
            />
            <button
              onClick={() => {
                if (!roomName) return;

                createRoom(roomName);

                setRoomName("");
              }}
            >
              Create
            </button>
          </form>
        </div>
      </div>
      <div />
      <div className="flex flex-col items-center justify-center flex-1">
        <RoomMessages />
      </div>
      <button className="px-4 py-2 text-white rounded-lg bg-stone-900" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Chat;
