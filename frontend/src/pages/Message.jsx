// src/pages/Message.jsx
import React, { useEffect, useState } from 'react';

const Message = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // TODO: fetch user messages from API
    setMessages([
      { id: 'm1', from: 'Bob', text: 'Hey, how are you?', seen: false },
      { id: 'm2', from: 'Carol', text: 'Check out the new thread.', seen: true },
    ]);
  }, []);

  return (
    <div className="page message-page">
      <h1>Messages</h1>
      {messages.length === 0 ? (
        <p>No messages.</p>
      ) : (
        <ul>
          {messages.map(m => (
            <li key={m.id} style={{ fontWeight: m.seen ? 'normal' : 'bold' }}>
              <strong>From: {m.from}</strong> — {m.text}
            </li>
          ))}
        </ul>
      )}
      {/* TODO: Add UI to send new message */}
    </div>
  );
};

export default Message;
