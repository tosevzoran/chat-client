import { getDefaultMiddleware } from '@reduxjs/toolkit';
import socketMiddleware from './socketMiddleware';
import users from './usersReducer';
import entities from './entitiesReducer';
import connection from './connectionReducer';

export default {
  reducer: {
    users,
    entities,
    connection,
  },
  middleware: [...getDefaultMiddleware(), socketMiddleware],
};
