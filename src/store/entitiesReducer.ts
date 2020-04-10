import { createReducer, createSelector } from '@reduxjs/toolkit';
import { denormalize, schema } from 'normalizr';
import { AppState, Message } from './types';

export const userEntity = new schema.Entity('users');
export const messageEntity = new schema.Entity('messages', {
  user: userEntity,
});
export const greetingEntity = new schema.Entity('greetings', {
  connectedUsers: [userEntity],
  messageHistory: [messageEntity],
});

const entityReducer = createReducer(
  {
    users: {},
    messages: {},
  },
  {
    WS_MESSAGE_RECEIVE: (state, action) => ({
      ...state,
      users: {
        ...state.users,
        ...action.payload.entities.users,
      },
      messages: {
        ...state.messages,
        ...action.payload.entities.messages,
      },
    }),
  }
);

export const messagesSelector = createSelector(
  (state: AppState) => state.entities.messages,
  (state: AppState) => state.entities,
  (messages, entities) =>
    Object.values(messages || {})
      .map((m): Message => denormalize(m, messageEntity, entities))
      .sort((a, b) => a.timestamp - b.timestamp)
);

export default entityReducer;
