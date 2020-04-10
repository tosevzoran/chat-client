import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { User, EntityState, WsAction } from './types';

type UserState = EntityState<User> & {
  loggedUser: User | null;
};

const messagesSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
  name: 'users',
  initialState: {
    entities: {},
    loggedUser: null,
  },
  reducers: {
    addUser: (state, action) => {},
    removeUser: (state, action) => {},
  },
  extraReducers: {
    WS_MESSAGE_RECEIVE: (state: UserState, { payload }: WsAction) => ({
      ...state,
      entities: {
        ...state.entities,
        ...payload.entities.users,
      },
    }),
  },
});

const { actions, reducer } = messagesSlice;

export const { addUser, removeUser } = actions;

export default reducer;
