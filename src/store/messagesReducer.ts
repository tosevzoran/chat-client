import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {},
  reducers: {
    addMessage: (state, action) => {},
    editMessage: (state, action) => {},
    removeMessage: (state, action) => {},
  },
});

const { actions, reducer } = messagesSlice;

export const { addMessage, editMessage, removeMessage } = actions;

export default reducer;
