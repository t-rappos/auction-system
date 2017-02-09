let Queries = require('./messageFactoryQueries.js');
let DB = require('./serverDB.js');
let Message = require('./message.js');

function deleteAllMessages(){
  return new Promise((resolve, reject)=>{
    resolve(Promise.all[DB.query(Queries.deleteAllMessages()[0]),
                        DB.query(Queries.deleteAllMessages()[1])]);
  });
}

function getUserMessages(username){
  return new Promise((resolve, reject)=>{
    DB.query(Queries.getUserMessages(username))
    .then(function(results){
      let messages = [];
      results.rows.map((row)=>{
        let sender = row.sender;
        let recipient = row.recipient;
        let title = row.title;
        let content = row.content;
        let read = row.read;
        messages.push(createMessage(sender, recipient, title, content,read));
      });
      resolve(messages);
    }).catch(function(e){
      console.log(e);
      reject(e);
    });
  });
}

let _messageSent = ()=>{};

function initialise(fireMessageEvent){
  return new Promise((resolve, reject)=>{
    _messageSent = fireMessageEvent;
    //create tables
    let queries = Queries.createTables();
    let q1 = queries[0];
    let q2 = queries[1];

    DB.query(q1).then(function(r){
      return DB.query(q2);
    })
    .then(function(r){
      resolve();
    })
    .catch(function(e){
      console.log('message factory : initialise: error: ' + e);
      reject(e);
    });
  });
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
      console.log('sending message : failed', e);
      reject(e);
    });
  });
}

function deleteMessage(msg){
  return new Promise((resolve, reject)=>{
      resolve(DB.query(Queries.deleteMessage(msg.getAuthor(),msg.getRecipient(),
                                            msg.getTitle(),msg.getMessage())));
  });
}

//injected into Message
function _setMessageRead(sender, recipient, title, contents){
  return new Promise((resolve, reject)=>{
    resolve(DB.query(Queries.setMessageRead(sender, recipient, title, contents)));
  });
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
