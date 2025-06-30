import React from "react";
import ReactMarkdown from "react-markdown";
import shield from "../../assets/logoShield.png";

export default function BotMessage({ markdown }) {
  return (
    <div className="chat bot">
      <img src={shield} alt="Bot avatar" className="chatImg" />
      <div className="message-content">
        <ReactMarkdown
          components={{
            h2: ({ node, ...props }) => <h2 className="verdict" {...props} />,
            h3: ({ node, ...props }) => (
              <h3 className="subheading" {...props} />
            ),
            ul: ({ node, ...props }) => <ul className="reasons" {...props} />,
            li: ({ node, ...props }) => (
              <li className="reasons__item" {...props} />
            ),
            a: ({ node, ...props }) => <a className="source-link" {...props} />,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
