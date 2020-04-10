import { Middleware } from 'redux';
import { normalize, schema } from 'normalizr';

const userEntity = new schema.Entity('users');
const messageEntity = new schema.Entity('messages', {
  user: userEntity,
});
const greetingEntity = new schema.Entity('greetings', {
  // loggedUser: userEntity,
  connectedUsers: [userEntity],
  messageHistory: [messageEntity],
});

const wsUrl = process.env.REACT_APP_CHAT_URL;
const wsPort = process.env.REACT_APP_CHAT_PORT;

const socketMiddleware: Middleware = (store) => {
  const socket = new WebSocket(`${wsUrl}:${wsPort}`);

  socket.onmessage = (message) => {
    const messageData = JSON.parse(message.data);

    let normalizationEntity = messageEntity;

    if (messageData.type === 'greeting') {
      normalizationEntity = greetingEntity;

      store.dispatch({
        type: 'WS_LOGGIN',
        payload: messageData.loggedUser,
      });
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
