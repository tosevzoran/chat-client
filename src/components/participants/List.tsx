import React from 'react';

interface User {
  id: number | string;
  username: string;
}

interface ParticipantListProps {
  participants: User[];
}

const List: React.FC<ParticipantListProps> = ({ participants }) => {
  if (participants.length === 0) {
    return <p>There are no users participating in this thread</p>;
  }

  return (
    <ul>
      {participants.map(({ id, username }) => (
        <li key={id}>{username}</li>
      ))}
    </ul>
  );
};

export default List;
