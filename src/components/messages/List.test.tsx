import React from 'react';
import { render } from '@testing-library/react';
import MessageList from './List';

const messages = [
  {
    id: 1,
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    username: 'Lorem Ipsum',
    timestamp: 23479547398,
    isEdited: false,
  },
  {
    id: 2,
    text:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
    username: 'Richard McClintock',
    timestamp: 57498734587,
    isEdited: false,
  },
  {
    id: 3,
    text:
      'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.',
    username: 'Finibus Bonorum',
    timestamp: 57477373451,
    isEdited: true,
  },
];

test('Message List', () => {
  const result = render(<MessageList messages={messages} />);

  messages.forEach((message) => {
    const username = result.getByText(message.username);
    const text = result.getByText(message.text);
    const timestamp = result.getByText(String(message.timestamp));

    expect(username).toBeInTheDocument();
    expect(timestamp).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});

test('Message List - empty state', () => {
  const result = render(<MessageList messages={[]} />);
  const emptyStateEl = result.getByText('This thread has no messages');

  expect(emptyStateEl).toBeInTheDocument();
});
