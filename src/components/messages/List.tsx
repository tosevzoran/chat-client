import React, { KeyboardEvent, useState, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPen, FaTrash } from 'react-icons/fa';
import { messagesSelector } from 'store/entitiesReducer';
import { loggedUserSelector } from 'store/usersReducer';
import Message from './Message';
import { Message as MessageType } from 'store/types';
import styled from 'styled-components';

const KEY_ENTER = 13;

const initialMessage: MessageType = {
  id: '',
  text: '',
  type: 'message',
  timestamp: 0,
  isDeleted: false,
  isEdited: false,
  sender: { id: '', username: '', isDeleted: false },
};

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

const MessageRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
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
  resize: none;
  font-family: inherit;
  font-size: 0.75rem;
`;

const Actions = styled.div`
  display: flex;
`;

const ActionButton = styled.button`
  border: none;
  margin: 0;
  padding: 0.5rem;
  width: auto;
  outline: none;
  background: transparent;
  cursor: pointer;
`;

const List: React.FC = () => {
  const [message, setMessage] = useState<MessageType>(initialMessage);
  const anchorRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const messages = useSelector(messagesSelector);
  const loggedUser = useSelector(loggedUserSelector);
  const isMyMessage = ({ sender }: MessageType) =>
    loggedUser && sender.id === loggedUser.id;

  useLayoutEffect(() => {
    if (
      anchorRef &&
      anchorRef.current &&
      typeof anchorRef.current.scrollIntoView === 'function'
    ) {
      anchorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!message.text.trim()) {
      return;
    }

    if (e.keyCode === KEY_ENTER && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();

      dispatch({
        type: 'WS_MESSAGE_SEND',
        payload: message,
      });

      setMessage(initialMessage);

      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage({ ...message, text: e.target.value });
  };

  const handleEditMessage = (message: MessageType) => {
    setMessage({ ...message, type: 'edit' });
  };

  const handleDeleteMessage = (message: MessageType) => {
    dispatch({
      type: 'WS_MESSAGE_SEND',
      payload: { ...message, type: 'delete' },
    });
  };

  return (
    <Container>
      <Messages>
        {!messages.length && <p>This thread has no messages</p>}
        {messages.map((message: MessageType) => (
          <MessageRow key={message.id}>
            <Message message={message} />
            {!message.isDeleted && isMyMessage(message) && (
              <Actions>
                <ActionButton
                  type="button"
                  onClick={() => handleEditMessage(message)}
                >
                  <FaPen />
                </ActionButton>
                <ActionButton
                  type="button"
                  onClick={() => handleDeleteMessage(message)}
                >
                  <FaTrash />
                </ActionButton>
              </Actions>
            )}
          </MessageRow>
        ))}
        <div ref={anchorRef}></div>
      </Messages>
      <MessageInput
        value={message.text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Message"
      />
    </Container>
  );
};

export default List;
