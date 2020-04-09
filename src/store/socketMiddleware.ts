import { Middleware } from 'redux';

const wsUrl = process.env.REACT_APP_CHAT_URL;
const wsPort = process.env.REACT_APP_CHAT_PORT;

const socketMiddleware: Middleware = (store) => {
  const socket = new WebSocket(`${wsUrl}:${wsPort}`);

  socket.onmessage = (message) => {
    store.dispatch({
      type: 'MESSAGE_RECEIVE',
      payload: JSON.parse(message.data),
    });
  };

  return (next) => (action) => {
    if (action.type === 'MESSAGE_SEND') {
      socket.send(JSON.stringify(action.payload));
      return;
    }

    next(action);
  };
};

export default socketMiddleware;
