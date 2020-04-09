import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import socketMiddleware from './socketMiddleware';
import users from './usersReducer';
import messages from './messagesReducer';

const store = configureStore({
  reducer: {
    messages,
    users,
  },
  middleware: [...getDefaultMiddleware(), socketMiddleware],
});

export default store;
