export type Message = {
  id: string;
  text: string;
  action: string;
  username: string;
  timestamp: number;
};

export type User = {
  id: string;
  username: string;
};

export type EntityState<Entity> = {
  entities: { [key: string]: Entity };
};

export type WsPayload = {
  entities: {
    messages: { [key: string]: Message };
  };
};

export type WsAction = {
  action: string;
  payload: WsPayload;
};

export type AppState = {
  users: EntityState<User>;
  messages: EntityState<Message>;
};
