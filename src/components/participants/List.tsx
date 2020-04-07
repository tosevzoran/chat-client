import React from 'react';

interface User {
  id: number | string;
  username: string;
}

interface ParticipantListProps {
  participants: User[];
}

const List: React.FC<ParticipantListProps> = ({ participants }) => {
  if (!participants.length) {
    return <p>This thread has no users</p>;
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
