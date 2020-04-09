import { createSlice, createSelector } from '@reduxjs/toolkit';

export type Message = {
  id: string;
  text: string;
  action: string;
  username: string;
  timestamp: number;
};

export type MessagesState = {
  entities: { [key: string]: Message };
};

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
    WS_MESSAGE_RECEIVE: (state, { payload }) => ({
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
  (state: { messages: MessagesState }) => state.messages.entities,
  (messages) =>
    Object.values(messages || {}).sort((a, b) => a.timestamp - b.timestamp)
);

export default reducer;
