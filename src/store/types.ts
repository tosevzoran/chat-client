export type Message = {
  id: string;
  text: string;
  type: string;
  username: string;
  timestamp: number;
};

export type User = {
  id: string;
  username: string;
};

export type AppState = {
  entities: {
    users: { [key: string]: User };
    messages: { [key: string]: Message };
  };
  users: {
    loggedUser: User;
  };
};
