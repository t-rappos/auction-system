let Queries = require('./messageFactoryQueries.js');
let DB = require('./serverDB.js');
let Message = require('./message.js');
let Utility = require('./utility.js');
let UtilData = require('./utilData.js');

function deleteAllMessages(){
  return UtilData.clearAllMessages();
}

function getUserMessages(username){
  return DB.getMany(Queries.getUserMessages(username), fillMessage);
}

let _messageSent = ()=>{};

function initialise(fireMessageEvent){
  _messageSent = fireMessageEvent;
}

function sendMessage(msg){
  return new Promise((resolve, reject)=>{

    let queries = Queries.sendMessage(msg.getAuthor(),msg.getRecipient(),
                                      msg.getTitle(), msg.getMessage());
    Promise.all([DB.query(queries[0]), DB.query(queries[1])])
    .then(function(results){
      _messageSent();
      resolve();
    })
    .catch(function(e){
      Utility.logError(e);
    });
  });
}

function deleteMessage(msg){
  return DB.query(Queries.deleteMessage(msg.getAuthor(),msg.getRecipient(),
                                        msg.getTitle(),msg.getMessage()));
}

//injected into Message
function _setMessageRead(sender, recipient, title, contents){
  return DB.query(Queries.setMessageRead(sender, recipient, title, contents));
}

function fillMessage(row){
  let sender = row.sender;
  let recipient = row.recipient;
  let title = row.title;
  let content = row.content;
  let read = row.read;
  return createMessage(sender, recipient, title, content, read);
}

function createMessage(sender, recipient, title, contents, read){
  let msg = new Message.Message(sender, recipient, title, contents);
  if(read){msg.read = read;}
  msg._setRead = _setMessageRead.bind(null,sender, recipient, title, contents);
  return msg;
}

module.exports = {
  deleteAllMessages : deleteAllMessages,
  getUserMessages : getUserMessages,
  initialise : initialise,
  sendMessage : sendMessage,
  deleteMessage : deleteMessage,
  createMessage : createMessage
};