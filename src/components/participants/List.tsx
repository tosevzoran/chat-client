import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { usersSelector } from 'store/entitiesReducer';
import Modal, { useModal } from 'components/modal';
import BaseButton from 'components/button/Base';
import { loggedUserSelector } from 'store/usersReducer';

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  overflow-y: auto;
  height: 100%;
`;

const StyledListItem = styled.li`
  padding: 1rem 2rem;
  border-bottom: 0.0625rem solid #cccccc;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const UserForm = styled.form`
  padding: 2rem;
  border-radius: 0.125rem;
  background-color: #ffffff;
  position: relative;
`;

const CloseButton = styled(BaseButton)`
  background: transparent;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

const LinkButton = styled(BaseButton)`
  color: #999999;
  font-size: 0.75rem;
`;

const List: React.FC = () => {
  const loggedUser = useSelector(loggedUserSelector);
  const participants = useSelector(usersSelector);
  const [username, setUsername] = useState('');
  const { showModal, hideModal } = useModal('user-modal');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (!participants.length) {
    return <p>This thread has no users</p>;
  }

  return (
    <>
      <StyledList>
        {participants.map(({ id, username }) => (
          <StyledListItem key={id}>
            {username}
            {loggedUser && loggedUser.id === id && (
              <LinkButton onClick={showModal}>Change username</LinkButton>
            )}
          </StyledListItem>
        ))}
      </StyledList>
      <Modal modalId="user-modal">
        <UserForm onSubmit={handleFormSubmit}>
          <CloseButton onClick={hideModal}>
            <FaTimes />
          </CloseButton>
          <input type="text" value={username} onChange={handleNameChange} />
          <button>Save</button>
        </UserForm>
      </Modal>
    </>
  );
};

export default List;
