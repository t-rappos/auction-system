//There is no additional state stored in this file...
//all state is stored in severState.js, which is basically modelling an external DB.

var express = require("express");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var debug = require('./utility.js');
let UserFacade = require('./facade/user.js');
let AccountFacade = require('./facade/account.js');
let TagFacade = require('./facade/tag.js');
let ItemFacade = require('./facade/item.js');
let serverDB = require('./serverDB.js');
let Utility = require('./utility.js');
let Promise = require('bluebird');


let resetDB = true;
serverDB.initialise(resetDB)
.then(()=>{
  debug.log("finished initialising server database");
});

io.on('connection', function(socket){
    //on connection code
    console.log("io.on(connection)");

  socket.on('disconnect',function(){
    console.log("socket.on(disconnect)");
    if(UserFacade.logOut(socket)){
      console.log('logged out a user');
    }
    //on disconnection
  });

  socket.on('modify_account', function(options, callback){
    console.log(options.details);
    let username = UserFacade.getUsername(socket);
    if (username === null){callback({error : 'user not logged in'});return;}
    Promise.all([AccountFacade.updateAccount(username, options.details), 
                 AccountFacade.updateAccountEmail(username, options.email)])
    .then(()=>{
      callback({});
    })
    .catch((e)=>{
      callback({error : e});
    });
  });


  socket.on('view_items', function(callback){
    let username = UserFacade.getUsername(socket);
    if (username === null){callback({error : 'user not logged in'});return;}
    let accountId = null;
    let zitems = [];
    let ztags = [];
    Promise.all([ItemFacade.createImage('image','url'),
                 AccountFacade.getAccount(username)])
    .spread((image, account)=>{
      accountId = account.id;
      return ItemFacade.createItem(image.id, 'testItem', 'testDesc', null, account.id);
    })
    .then((item)=>{
      return Promise.all([TagFacade.createItemTagValue(item.id,'value',5),
                          TagFacade.createItemTagValue(item.id,'quantity',2)]);
    })
    .then(()=>{
      return TagFacade.getAllTags();
    })
    .then((tags)=>{
      ztags = tags;
      return ItemFacade.getAccountItems(accountId)
    })
    .then((items)=>{
      zitems = items; 
      let itemIds = [];
      items.map((item)=>{itemIds.push(item.id);});
      return TagFacade.getAllItemsTagValues(itemIds);
    })
    .then((tagValues)=>{
        console.log("returning " + zitems.length + " items to client");
        console.log("returning " + tagValues.length + " tagValues to client");
        console.log("returning " + ztags.length + " tags to client");
        callback({items: zitems, tagValues : tagValues, tags : ztags});
    })
    .catch((e)=>{
      console.log(e);
      callback({error: e});
    });
  });
  
  socket.on('view_account', function(callback){
    let username = UserFacade.getUsername(socket);
    if (username === null){callback({error : 'user not logged in'});return;}
    AccountFacade.getAccount(username)
    .then((account)=>{
      let pd = JSON.parse(account.details);
      callback({username : account.username, email: account.email, money : account.money, details : pd});
    })
    .catch((e)=>{
      callback({error: e});
    });
  });

  socket.on('create_account', function(options, resolve){
    AccountFacade.createAccount(options.username, options.email, options.password,1000)
    .then((res)=>{
      resolve(true); // successful account creation
    })
    .catch((e)=>{
      resolve(e.message);
    });
  });

  socket.on('login', function(options, resolve){
    UserFacade.logIn(options.username, options.password, socket)
    .then((result)=>{
      console.log('logged in ' + options.username + ' : ' + result);
      resolve(result);
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });
  //Calls a return function to pass data back
  /*
  socket.on('get_messages', function(returnMessagesFn){

  });
  */

});

function httpListen(port){
  http.listen(port, function(){
    debug.log('listening on *:',port);
  });
}
httpListen(process.env.PORT || 3000);
app.use(express.static('public'));


debug.log("finished initialising server");