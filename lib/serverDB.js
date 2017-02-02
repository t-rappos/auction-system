var db = require('./serverPGDB.js'); //TODO: abstract this out?
var debug = require('./logger.js');

function createDBTables(){
  var createMessageTable = "CREATE TABLE IF NOT EXISTS messages\
  (\
    id serial PRIMARY KEY,\
    date timestamp without time zone NOT NULL,\
    username text NOT NULL,\
    message text NOT NULL\
  );";

  var createUsersTable = "CREATE TABLE IF NOT EXISTS users\
  (\
    id serial PRIMARY KEY,\
    username text NOT NULL\
  );";
  db.query(createMessageTable, function(done){ });
  db.query(createUsersTable, function(done){  });
}

//calls the argument callback on success
function initialise(onSuccess){
  db.connect(function(success){
    if (success){
      createDBTables();
      onSuccess();
    }
    else  {
      throw new Error('serverDB: initialise : Couldnt connect to database');
    }
  });
}

var stagedMessages = [];
//prepares a message to be stored in the database
function stageMessage(msg){
  stagedMessages.push(msg);
}

function stripDate(date){
  var inp = date+" ";
  var rDate = "";
  for (var i = 0; i < inp.length; i++){
      if(inp[i]!='G'){
        rDate+=inp[i];
      }
      else{
        break;
      }
  }
  return rDate;
}

//stores all messages that are staged
function storeMessages(){
  if (stagedMessages && stagedMessages.length > 0){
  var q1 = 'INSERT INTO messages (date, username, message) VALUES';

  //TODO: update this to deal with SQL injection .e.g. setting a username to '; DROP TABLE ...'

  var msgCount = stagedMessages.length;
  var i = 0;
  stagedMessages.map(function(msg){
    q1 += "('"+stripDate(msg.date)+"', '"+msg.author+"', '"+msg.message+ "')";
    if (i++ != (msgCount-1)){
      q1+=",";
    }
  });
  q1 += ';';

  db.query(q1, function(done){ if(!done){
    debug.log('serverDB: storeMessages: error');} });
  stagedMessages = [];
  }
}

//gets a list of messages from the database
//[{author:, message: date:},{..},..]
//calls the argument callback function with the resultant message list
function loadMessages(onSuccess){
  var q = "select * from messages;";
  db.query(q, function(result){
     if(!result){
       debug.log('serverDB: loadMessages: error');
     }else{
       var msgs = [];
       for (var i = 0; result && result.rows && i < result.rows.length; i++){
         msgs.push({
           date : result.rows[i].date,
           author : result.rows[i].username,
           message : result.rows[i].message
         });
       }
       onSuccess(msgs);
     }
  });
}

module.exports =
{
  initialise:initialise,
  loadMessages:loadMessages,
  storeMessages:storeMessages,
  stageMessage:stageMessage
};
