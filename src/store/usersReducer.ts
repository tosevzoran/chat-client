import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'users',
  initialState: {},
  reducers: {
    addUser: (state, action) => {},
    removeUser: (state, action) => {},
  },
});

const { actions, reducer } = messagesSlice;

export const { addUser, removeUser } = actions;

export default reducer;
