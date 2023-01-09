import Avatar from "boring-avatars";
import {useRouter} from "next/router";
import React, {useState} from "react";

import useMessages from "../hooks/useMessages";

const RoomMessages = () => {
  const [message, setMessage] = useState("");
  const {sendMessage, messages} = useMessages();

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.timestamp} className="flex items-center justify-center gap-2 ">
            <div className="align-top">
              <Avatar
                colors={["#6CCFF6", "#FEA0DC", "#98CE00", "#FFFFFC"]}
                name={message.userID}
                size={50}
                variant="beam"
              />
            </div>
            <div className="flex-1">
              <h1 className="font-bold">{message.username}</h1>
              <div>{message.message}</div>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <input
          placeholder="message"
          type="text"
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setMessage(e.target.value);
          }}
        />
        <button
          onClick={() => {
            if (!message) return;
            sendMessage(message);
            setMessage("");
          }}
        >
          send message
        </button>
      </form>
    </div>
  );
};

export default RoomMessages;
