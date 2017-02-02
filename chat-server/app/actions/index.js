//TODO: consolidate containers to have dispatch function names that correspond to these action generators

let nextMessage = 0; //TODO: do we need this?
export const addMessage = (msg) => {
  return {
    type: 'MESSAGE',
    message : {author : msg.author, message: msg.message, date: msg.date},
    id: nextMessage++,
  };
};

let nextMessageList = 0; //TODO: do we need this?
export const setMessageList = (messages) => {
  return {
    type: 'GET_MESSAGES',
    messages,
    id: nextMessageList++,
  };
};


let nextsetCurrentUser = 0;
export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    user,
    id: nextsetCurrentUser++,
  };
};

let nextaddUser = 0;
export const addUser = (user) => {
  return {
    type: 'ADD_USER',
    user,
    id: nextaddUser++,
  };
};

let nextremoveUser = 0;
export const removeUser = (user) => {
  return {
    type: 'REMOVE_USER',
    user,
    id: nextremoveUser++,
  };
};

let nextsetUsers = 0;
export const setUsers = (users) => {
  return {
    type: 'SET_USERS',
    users,
    id: nextsetUsers++,
  };
};
