// send message input fiel on the bottom of the chat
// allows user to type and send messages

import React from "react";
import sendBtn from "../../assets/send.svg";

export default function Input({ value, onChange, onSend }) {
  return (
    <div className="chatFooter">
      <div className="inp">
        <input
          type="text"
          placeholder="Send Message"
          value={value}
          onChange={onChange}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />
        <button className="send" onClick={onSend}>
          <img src={sendBtn} alt="Send" />
        </button>
      </div>
    </div>
  );
}
