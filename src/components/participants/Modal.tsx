import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { loggedUserSelector } from 'store/usersReducer';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import BaseButton from 'components/button/Base';
import ModalWrapper, { useModal } from 'components/modal';

const UserForm = styled.form`
  padding: 2rem;
  border-radius: 0.125rem;
  background-color: #ffffff;
  position: relative;
  min-height: 10rem;
  max-width: 20rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CloseButton = styled(BaseButton)`
  background: transparent;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

const ConfirmButton = styled(BaseButton)`
  border-radius: 0.125rem;
  background-color: #56d492;
  color: #011627;
  font-size: 0.75rem;
  padding: 0.25rem 2rem;
  &:hover {
    background-color: #66d89c;
  }
`;

const Modal: React.FC<{ modalId: string }> = ({ modalId }) => {
  const { hideModal } = useModal(modalId);
  const loggedUser = useSelector(loggedUserSelector);
  const [username, setUsername] = useState(loggedUser && loggedUser.username);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hideModal();
  };

  return (
    <ModalWrapper modalId={modalId}>
      <UserForm onSubmit={handleFormSubmit}>
        <CloseButton onClick={hideModal}>
          <FaTimes />
        </CloseButton>
        <input type="text" value={username} onChange={handleNameChange} />
        <ConfirmButton type="submit">Save</ConfirmButton>
      </UserForm>
    </ModalWrapper>
  );
};

export * from 'components/modal';
export default Modal;
