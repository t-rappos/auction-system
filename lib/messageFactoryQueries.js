
//TODO: should we update sender / recipient to be integer instead of text?

function createMessageTable(){
  return "CREATE TABLE IF NOT EXISTS message\
  (id serial PRIMARY KEY,\
  parent_id integer REFERENCES message(id),\
  content varchar(100),\
  title varchar(500), \
  read bool DEFAULT false, \
  time_created timestamp without time zone NOT NULL,\
  sender text REFERENCES message_route (sender),\
  recipient text REFERENCES message_route (recipient)\
  );";
}

function createMessageRouteTable(){
  return "CREATE TABLE IF NOT EXISTS message_route\
  (sender text UNIQUE REFERENCES account(username),\
  recipient text UNIQUE REFERENCES account(username),\
  PRIMARY KEY (sender, recipient)\
  );";
}

function createTables(){
  return [createMessageRouteTable(),createMessageTable()];
}

function selectMessageToDelete(author, recipient, title, content){
  console.log('selectMessageToDelete: %s, %s, %s, %s', title, content, recipient, author);
  return "SELECT * FROM message m\
  INNER JOIN message_route mr\
    ON m.sender = mr.sender AND m.recipient = mr.recipient\
  WHERE m.title = '"+title+"' AND m.content = '"+content+"'\
  AND mr.recipient = '"+recipient+"' AND mr.sender = '"+author+"';";
}

//TODO: if Message had an ID then we wouldnt need to find it
function deleteMessage(author, recipient, title, content){
  return "DELETE FROM message m\
  USING message_route mr\
  WHERE m.sender = mr.sender AND m.recipient = mr.recipient\
  AND m.title = '"+title+"' AND m.content = '"+content+"'\
  AND mr.recipient = '"+recipient+"' AND mr.sender = '"+author+"';";
}

function deleteAllMessages(){
  return ["DELETE FROM message WHERE 1=1;","DELETE FROM message_route WHERE 1=1;"];
}

function getUserMessages(recipient){
  return "SELECT * \
  FROM message m  \
  INNER JOIN message_route mr\
    ON m.sender = mr.sender AND m.recipient = mr.recipient\
  WHERE mr.recipient = '"+recipient+"' ;";
}

function getAllMessages(){
  return 'SELECT * from message;';
}

/*
function getAllMessages(){
  return "SELECT * \
  FROM message m  \
  INNER JOIN message_route mr\
    ON m.sender = mr.sender AND m.recipient = mr.recipient;";
}
*/

function setMessageRead(sender, recipient, title, contents){
  return "UPDATE message m\
  INNER JOIN message_route mr\
    ON m.sender = mr.sender AND m.recipient = mr.recipient\
  SET m.read = true \
  WHERE m.title = '"+title+"' AND m.content = '"+contents+"'\
  AND mr.recipient = '"+recipient+"' AND mr.sender = '"+sender+"'";
}

//TODO: is message_route over complicating this, we still have to enter duplicate
//sender + recipient foriegn keys in message so whats the point...
function sendMessage(sender, recipient, title, contents){
  let a = "INSERT INTO message_route (sender, recipient) VALUES\
  ('"+sender+"','"+recipient+"') ON CONFLICT DO NOTHING;";

  let b = "INSERT INTO message (sender,recipient, title, content, time_created) VALUES\
  ('"+sender+"','"+recipient+"', '"+title+"', '"+contents+"', current_timestamp); ";

  return [a,b];
}

module.exports = {
  createTables : createTables,
  deleteMessage : deleteMessage,
  deleteAllMessages : deleteAllMessages,
  getUserMessages : getUserMessages,
  setMessageRead : setMessageRead,
  sendMessage : sendMessage,
  getAllMessages: getAllMessages,
  selectMessageToDelete : selectMessageToDelete
};
