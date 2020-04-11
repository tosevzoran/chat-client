import { getDefaultMiddleware } from '@reduxjs/toolkit';
import socketMiddleware from './socketMiddleware';
import users from './usersReducer';
import entities from './entitiesReducer';

export default {
  reducer: {
    users,
    entities,
  },
  middleware: [...getDefaultMiddleware(), socketMiddleware],
};
