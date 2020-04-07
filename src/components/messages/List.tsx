import React from 'react';
import Message, { MessageProps } from './Message';

const List: React.FC<{ messages: MessageProps[] }> = ({ messages }) => {
  if (!messages.length) {
    return <p>This thread has no messages</p>;
  }

  return (
    <div>
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </div>
  );
};

export default List;
