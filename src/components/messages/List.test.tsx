import React from 'react';
import { render } from 'test/test-utils';
import { messages } from 'test/data';
import MessageList from './List';
import { normalize } from 'normalizr';
import { timestampToString } from 'helper/format';
import storeConfig from 'store';
import { messageEntity } from 'store/entitiesReducer';
import { configureStore } from '@reduxjs/toolkit';

test('Message List', () => {
  const store = configureStore(storeConfig);
  const result = render(<MessageList />, { store });

  store.dispatch({
    type: 'WS_LOGGIN',
    payload: {
      id: '1',
      username: 'Lorem Ipsum',
    },
  });

  store.dispatch({
    type: 'WS_MESSAGE_RECEIVE',
    payload: normalize(messages, [messageEntity]),
  });

  messages.forEach((message) => {
    const username = result.getByText(message.sender.username);
    const text = result.getByText(message.text);
    const timestamp = result.getByText(timestampToString(message.timestamp));

    expect(username).toBeInTheDocument();
    expect(timestamp).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});

test('Message List - empty state', () => {
  const result = render(<MessageList />);
  const emptyStateEl = result.getByText('This thread has no messages');

  expect(emptyStateEl).toBeInTheDocument();
});
