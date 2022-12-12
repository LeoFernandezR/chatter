import {useRouter} from "next/router";
import React, {useState} from "react";

import useMessages from "../hooks/useMessages";

const RoomMessages = () => {
  const [message, setMessage] = useState("");
  const {query} = useRouter();
  const {sendMessage, messages} = useMessages({roomID: query.roomID as string | undefined});

  if (!query.roomID) {
    return null;
  }

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.timestamp}>{message.message}</li>
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
