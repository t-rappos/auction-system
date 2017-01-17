let nextTodoId = 0
export const addMessage = (msg) => {
  console.log('actions: addMessage', msg);
  return {
    type: 'MESSAGE',
    message : {author : msg.author, message: msg.message, date: msg.date},
    id: nextTodoId++,
  }
}
