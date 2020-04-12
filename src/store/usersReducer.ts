import {
  createSlice,
  SliceCaseReducers,
  createSelector,
} from '@reduxjs/toolkit';
import { AppState, User } from './types';

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
    WS_USER_NAME_UPDATE: (state, { payload }: LoginPayload) => {
      if (state.loggedUser && state.loggedUser.id !== payload.id) {
        return state;
      }

      return {
        ...state,
        loggedUser: payload,
      };
    },
  },
});

export const loggedUserSelector = createSelector(
  (state: AppState) => state.users.loggedUser,
  (loggedUser) => loggedUser
);

const { actions, reducer } = messagesSlice;

export const { addUser, removeUser } = actions;

export default reducer;
