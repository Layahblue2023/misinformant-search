// gets the chat history from user and bot then displays it

import React from "react";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";

export default function History({ messages }) {
  return (
    <div className="chats">
      {messages.map((msg) =>
        msg.speaker === "bot" ? (
          <BotMessage key={msg.id} markdown={msg.markdown} />
        ) : (
          <UserMessage key={msg.id} text={msg.text} />
        )
      )}
    </div>
  );
}
