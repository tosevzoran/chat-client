import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BaseButton from 'components/button/Base';
import UserModal, { useModal } from 'components/participants/Modal';
import { usersSelector } from 'store/entitiesReducer';
import { loggedUserSelector } from 'store/usersReducer';

const USER_MODAL = 'user-modal';

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

const LinkButton = styled(BaseButton)`
  color: #999999;
  font-size: 0.75rem;
`;

const List: React.FC = () => {
  const loggedUser = useSelector(loggedUserSelector);
  const participants = useSelector(usersSelector);
  const { showModal } = useModal(USER_MODAL);

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
      <UserModal modalId={USER_MODAL} />
    </>
  );
};

export default List;
