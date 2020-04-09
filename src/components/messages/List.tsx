import React, { KeyboardEvent, useState } from 'react';
import Message, { MessageProps } from './Message';
import styled from 'styled-components';

const KEY_ENTER = 13;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
`;

const StyledMessage = styled(Message)`
  & + & {
    margin-top: 1.5rem;
  }
`;

const MessageInput = styled.textarea`
  border-radius: 0.125rem;
  border: 0.0625rem solid #cccccc;
  padding: 0.25rem;
  margin-top: 1rem;
  min-height: 1rem;
  max-height: 10rem;
  overflow-y: auto;
  width: 100%;
`;

const List: React.FC<{ messages: MessageProps[] }> = ({ messages }) => {
  const [message, setMessage] = useState('');

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === KEY_ENTER && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      // TODO: send the actual message
      setMessage('');

      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <Container>
      <Messages>
        {!messages.length && <p>This thread has no messages</p>}
        {messages.map((message) => (
          <StyledMessage key={message.id} {...message} />
        ))}
      </Messages>
      <MessageInput
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </Container>
  );
};

export default List;
