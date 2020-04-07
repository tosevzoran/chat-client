import React from 'react';
import { render } from '@testing-library/react';
import ParticipantList from './List';

const users = [
  {
    id: 1,
    username: 'Lorem Ipsum',
  },
  {
    id: 2,
    username: 'Richard McClintock',
  },
  {
    id: 3,
    username: 'Finibus Bonorum',
  },
];

test('Participants List', () => {
  const result = render(<ParticipantList participants={users} />);

  users.forEach(({ username }) => {
    const userEl = result.getByText(username);
    expect(userEl).toBeInTheDocument();
  });
});

test('Participant List - empty state', () => {
  const result = render(<ParticipantList participants={[]} />);
  const emptyStateEl = result.getByText('This thread has no users');

  expect(emptyStateEl).toBeInTheDocument();
});
