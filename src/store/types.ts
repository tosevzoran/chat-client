export type Message = {
  id: string;
  text: string;
  type: string;
  timestamp: number;
  sender: User;
  data?: { [key: string]: any };
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
  connection: {
    isLive: boolean;
  };
};
