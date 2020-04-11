import { Middleware } from 'redux';
import { normalize } from 'normalizr';

import { messageEntity, greetingEntity } from './entitiesReducer';

const wsUrl = process.env.REACT_APP_CHAT_URL;
const wsPort = process.env.REACT_APP_CHAT_PORT;

const KEY_LOGGED_USER = 'LOGGED_USER';

const socketMiddleware: Middleware = (store) => {
  const loggedUserRaw = localStorage.getItem(KEY_LOGGED_USER);
  let loggedUser = null;
  try {
    loggedUser = loggedUserRaw ? JSON.parse(loggedUserRaw) : null;
  } catch (e) {
    localStorage.removeItem(KEY_LOGGED_USER);
  }

  let url = `${wsUrl}:${wsPort}`;

  if (loggedUser) {
    url += `?userId=${loggedUser.id}`;
  }

  const socket = new WebSocket(url);

  socket.onmessage = (message) => {
    const messageData = JSON.parse(message.data);

    let normalizationEntity = messageEntity;

    if (messageData.type === 'greeting') {
      normalizationEntity = greetingEntity;

      store.dispatch({
        type: 'WS_LOGGIN',
        payload: messageData.data.loggedUser,
      });

      localStorage.setItem(
        KEY_LOGGED_USER,
        JSON.stringify(messageData.data.loggedUser)
      );
    }

    store.dispatch({
      type: 'WS_MESSAGE_RECEIVE',
      payload: normalize(messageData, normalizationEntity),
    });
  };

  return (next) => (action) => {
    if (action.type === 'WS_MESSAGE_SEND') {
      socket.send(JSON.stringify(action.payload));
      return;
    }

    next(action);
  };
};

export default socketMiddleware;
