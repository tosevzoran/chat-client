import React from 'react';
import styled from 'styled-components';
import { timestampToString } from 'helper/format';
import { Message as MessageType } from 'store/types';

export interface MessageProps {
  message: MessageType;
  className?: string;
  onContextMenu?: (e: React.MouseEvent) => void;
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

const StatusText = styled.div`
  margin-top: 0.125rem;
  font-size: 0.75rem;
  color: #9c9c9c;
`;

const Header: React.FC<Partial<MessageType>> = ({ username, timestamp }) => (
  <HeaderContainer>
    <User>{username}</User>
    <Time>{timestampToString(timestamp)}</Time>
  </HeaderContainer>
);

const Body: React.FC<Partial<MessageType>> = ({
  text,
  isEdited,
  isDeleted,
}) => {
  if (isDeleted) {
    return <StatusText>(Deleted)</StatusText>;
  }

  return (
    <div>
      {text}
      {isEdited && <StatusText>(Edited)</StatusText>}
    </div>
  );
};

const Message: React.FC<MessageProps> = ({
  message,
  className,
  onContextMenu,
}) => {
  const { username, timestamp, text } = message;

  return (
    <div className={className} onContextMenu={onContextMenu}>
      <Header username={username} timestamp={timestamp} />
      <Body
        text={text}
        isEdited={message.isEdited}
        isDeleted={message.isDeleted}
      />
    </div>
  );
};

export default Message;
