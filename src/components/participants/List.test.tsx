import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import { render } from 'test/test-utils';
import { messages } from 'test/data';
import ParticipantList from './List';
import storeConfig from 'store';
import { messageEntity } from 'store/entitiesReducer';

test('Participants List', () => {
  const store = configureStore(storeConfig);
  const result = render(<ParticipantList />, { store });

  store.dispatch({
    type: 'WS_MESSAGE_RECEIVE',
    payload: normalize(messages, [messageEntity]),
  });

  messages.forEach(({ sender }) => {
    const userEl = result.getByText(sender.username);
    expect(userEl).toBeInTheDocument();
  });
});

test('Participant List - empty state', () => {
  const result = render(<ParticipantList />);
  const emptyStateEl = result.getByText('This thread has no users');

  expect(emptyStateEl).toBeInTheDocument();
});
