import { createReducer, createSelector } from '@reduxjs/toolkit';
import { denormalize, schema } from 'normalizr';
import { AppState, Message } from './types';

export const userEntity = new schema.Entity('users');
export const messageEntity = new schema.Entity('messages', {
  sender: userEntity,
  data: {
    // For joined/left notification
    // the message sender is the Meeetingbot
    // and the user info is passed as data
    user: userEntity,
  },
});
export const greetingEntity = new schema.Entity('greetings', {
  data: {
    connectedUsers: [userEntity],
    messageHistory: [messageEntity],
  },
});

const entityReducer = createReducer(
  {
    users: {},
    messages: {},
  },
  {
    WS_USER_NAME_UPDATE: (state, action) => ({
      ...state,
      users: {
        ...state.users,
        [action.payload.id]: action.payload,
      },
    }),
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

export const usersSelector = createSelector(
  (state: AppState) => state.entities.users,
  (users) => Object.values(users || {}).filter((user) => !user.isDeleted)
);

export default entityReducer;
