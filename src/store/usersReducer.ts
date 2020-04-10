import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { User } from './types';

type UserState = {
  loggedUser: User | null;
};

type LoginPayload = {
  action: string;
  payload: User;
};

const messagesSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
  name: 'users',
  initialState: {
    loggedUser: null,
  },
  reducers: {
    addUser: (state, action) => {},
    removeUser: (state, action) => {},
  },
  extraReducers: {
    WS_LOGGIN: (state: UserState, { payload }: LoginPayload) => ({
      ...state,
      loggedUser: payload,
    }),
  },
});

const { actions, reducer } = messagesSlice;

export const { addUser, removeUser } = actions;

export default reducer;
