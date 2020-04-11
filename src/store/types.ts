export type Message = {
  id: string;
  text: string;
  type: string;
  username: string;
  timestamp: number;
  user: User;
  isEdited: boolean;
  isDeleted: boolean;
};

export type User = {
  id: string;
  username: string;
  isDeleted: boolean;
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
