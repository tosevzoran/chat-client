import React from 'react';
import Message, { MessageProps } from './Message';

const List: React.FC<{ messages: MessageProps[] }> = ({ messages }) => {
  return (
    <div>
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </div>
  );
};

export default List;
