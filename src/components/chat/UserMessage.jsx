// structure for how the users text buble will look like

import React from "react";

export default function UserMessage({ text }) {
  return (
    <div className="chat user">
      <div className="message-content">
        <p className="txt">{text}</p>
      </div>
    </div>
  );
}
