import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';

interface HeaderProps {
  username: string;
  timestamp: number;
}

interface BodyProps {
  text: string;
}

export interface MessageProps extends HeaderProps, BodyProps {
  id: string | number;
  className?: string;
}

const Time = styled.span`
  color: #cecece;
  margin-left: 1rem;
`;

const User = styled.b`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeaderContainer = styled.div`
  margin-bottom: 0.25rem;
  display: flex;
`;

const timestampToString = (timestamp: number) =>
  format(new Date(timestamp), 'H:mm');

const Header: React.FC<HeaderProps> = ({ username, timestamp }) => (
  <HeaderContainer>
    <User>{username}</User>
    <Time>{timestampToString(timestamp)}</Time>
  </HeaderContainer>
);

const Body: React.FC<BodyProps> = ({ text }) => <div>{text}</div>;

const Message: React.FC<MessageProps> = ({
  username,
  timestamp,
  text,
  className,
}) => {
  return (
    <div className={className}>
      <Header username={username} timestamp={timestamp} />
      <Body text={text} />
    </div>
  );
};

export default Message;
