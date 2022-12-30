import Link from "next/link";
import {useRouter} from "next/router";
import React, {useState} from "react";

import RoomMessages from "../components/RoomMessages";
import {useAuth} from "../context/AuthContext";
import useRooms from "../hooks/useRooms";

const Chat = () => {
  const [roomName, setRoomName] = useState("");
  const {logout} = useAuth();
  const {query} = useRouter();
  const {createRoom, rooms} = useRooms();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-2 text-xl">
      <div className="flex-1 flex flex-col items-center justify-center">
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
              </li>
            ))}
          </ul>
          <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
            <input
              className="border-black border rounded px-2"
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
      <div className="flex-1 flex flex-col justify-center items-center">
        <RoomMessages />
      </div>
      <button className="py-2 px-4 bg-stone-900 text-white rounded-lg" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Chat;
