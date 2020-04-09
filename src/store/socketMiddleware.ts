import { Middleware } from 'redux';
import { normalize, schema } from 'normalizr';

const messageEntity = new schema.Entity('messages');

const wsUrl = process.env.REACT_APP_CHAT_URL;
const wsPort = process.env.REACT_APP_CHAT_PORT;

const socketMiddleware: Middleware = (store) => {
  const socket = new WebSocket(`${wsUrl}:${wsPort}`);

  socket.onmessage = (message) => {
    store.dispatch({
      type: 'WS_MESSAGE_RECEIVE',
      payload: normalize(JSON.parse(message.data), messageEntity),
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
