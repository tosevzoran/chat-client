import { createSlice, createSelector } from '@reduxjs/toolkit';
import { AppState, Message, EntityState, WsAction } from './types';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    entities: {},
  },
  reducers: {
    addMessage: (state, action) => {},
    editMessage: (state, action) => {},
    removeMessage: (state, action) => {},
  },
  extraReducers: {
    WS_MESSAGE_RECEIVE: (
      state: EntityState<Message>,
      { payload }: WsAction
    ) => ({
      entities: {
        ...state.entities,
        ...payload.entities.messages,
      },
    }),
  },
});

const { actions, reducer } = messagesSlice;

export const { addMessage, editMessage, removeMessage } = actions;

export const messagesSelector = createSelector(
  (state: AppState) => state.messages.entities,
  (messages) =>
    Object.values(messages || {}).sort((a, b) => a.timestamp - b.timestamp)
);

export default reducer;
