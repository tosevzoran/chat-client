import React from 'react';

interface HeaderProps {
  username: string;
  timestamp: number;
}

interface BodyProps {
  text: string;
}

export interface MessageProps extends HeaderProps, BodyProps {
  id: string | number;
}

const Header: React.FC<HeaderProps> = ({ username, timestamp }) => (
  <div>
    <b>{username}</b>
    <span>{timestamp}</span>
  </div>
);

const Body: React.FC<BodyProps> = ({ text }) => <div>{text}</div>;

const Message: React.FC<MessageProps> = ({ username, timestamp, text }) => {
  return (
    <div>
      <Header username={username} timestamp={timestamp} />
      <Body text={text} />
    </div>
  );
};

export default Message;
