import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { usersSelector } from 'store/entitiesReducer';

interface User {
  id: number | string;
  username: string;
}

interface ParticipantListProps {
  participants: User[];
}

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
`;

const List: React.FC = () => {
  const participants = useSelector(usersSelector);

  if (!participants.length) {
    return <p>This thread has no users</p>;
  }

  return (
    <StyledList>
      {participants.map(({ id, username }) => (
        <StyledListItem key={id}>{username}</StyledListItem>
      ))}
    </StyledList>
  );
};

export default List;
