import { configureStore } from '@reduxjs/toolkit';
import users from './usersReducer';
import messages from './messagesReducer';

const store = configureStore({
  reducer: {
    messages,
    users,
  },
});

export default store;
