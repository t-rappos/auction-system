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

  //add default item list
  return Promise.all([ItemFacade.removeAllImages()]);
  
})
.then(()=>{
  return Promise.all([ItemFacade.createImage('gear','./assets/gear.png'),
                      ItemFacade.createImage('guitar','./assets/guitar.jpg'),
                      ItemFacade.createImage('lighter','./assets/lighter.jpg'),
                      ItemFacade.createImage('rubiks','./assets/rubiks.png'),
                      ItemFacade.createImage('staple','./assets/staple.jpg'),
                      ItemFacade.createImage('toy','./assets/toy.jpg')]);
})
.then(()=>{
  console.log("finished creating images");
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

  socket.on('view_tags', function(callback){
      TagFacade.getAllTags()
      .then((tags)=>{
        callback({tags : tags});
      })
      .catch((e)=>{
        console.log(e);
      callback({error: e});
    });
  });

/*
options.imageId
options.name
options.desc
options.tagNames
options.tagValues
*/
  socket.on('create_item', function(options, callback){
    let username = UserFacade.getUsername(socket);
    if (username === null){callback({error : 'user not logged in'});return;}
    AccountFacade.getAccount(username)
    .then((account)=>{
      return ItemFacade.createItem(options.imageId,options.name, options.desc, null, account.id);
    })
    .then((item)=>{
      let actions = [];
      options.tagNames.map((n,i)=>{
        actions.push(TagFacade.createItemTagValue(item.id,n,options.tagValues[i]));
      });
      return Promise.all(actions);
    })
    .then(()=>{
      callback(true);
      console.log('created item');
    })
    .catch((e)=>{
        console.log(e);
      callback({error: e});
    });
  });

  socket.on('view_images', function(callback){
      ItemFacade.getImageList()
      .then((images)=>{
        callback({images : images});
      })
      .catch((e)=>{
        console.log(e);
      callback({error: e});
    });
  });

  socket.on('view_items', function(callback){
    let username = UserFacade.getUsername(socket);
    if (username === null){callback({error : 'user not logged in'});return;}
    let accountId = null;
    let zitems = [];
    let ztags = [];
    let zimages = [];

    AccountFacade.getAccount(username)
    .then((account)=>{
      accountId = account.id;
    })
    .then(()=>{
      return ItemFacade.getImageList();
    })
    .then((images)=>{
      zimages = images; 
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
        console.log("returning " + zimages.length + " images to client");
        callback({items: zitems, tagValues : tagValues, tags : ztags, images : zimages});
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