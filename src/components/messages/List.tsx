import React from 'react';
import Message, { MessageProps } from './Message';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  padding: 1.5rem;
`;

const StyledMessage = styled(Message)`
  & + & {
    margin-top: 1.5rem;
  }
`;

const List: React.FC<{ messages: MessageProps[] }> = ({ messages }) => {
  if (!messages.length) {
    return <p>This thread has no messages</p>;
  }

  return (
    <Container>
      {messages.map((message) => (
        <StyledMessage key={message.id} {...message} />
      ))}
    </Container>
  );
};

export default List;
