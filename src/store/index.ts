import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import socketMiddleware from './socketMiddleware';
import users from './usersReducer';
import entities from './entitiesReducer';

const store = configureStore({
  reducer: {
    users,
    entities,
  },
  middleware: [...getDefaultMiddleware(), socketMiddleware],
});

export default store;
