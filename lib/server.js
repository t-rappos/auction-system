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
let ListingFacade = require("./facade/listing.js");

let resetDB = false;
serverDB.initialise(resetDB)
.then(()=>{
  //TODO: read content folder and create all images automatically
  /* Promise.all([ItemFacade.removeAllImages()])
    .then(()=>{
      return  */
      ItemFacade.getImageList()
      .then((images)=>{
        if(!(images && images.length > 0)){
          Promise.all([ItemFacade.createImage('gear','./assets/gear.png'),
                        ItemFacade.createImage('guitar','./assets/guitar.jpg'),
                        ItemFacade.createImage('lighter','./assets/lighter.jpg'),
                        ItemFacade.createImage('rubiks','./assets/rubiks.png'),
                        ItemFacade.createImage('staple','./assets/staple.jpg'),
                        ItemFacade.createImage('toy','./assets/toy.jpg')])
          .then((res)=>{
            console.log("finished creating images");
          });
        } 
      });
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

//options.itemId
  socket.on('destroy_item', function(options, callback){
    ItemFacade.removeItem(options.itemId)
    .then(()=>{
      callback({});
    })
    .catch((e)=>{
      console.log(e);
      callback({error : e});
    });
  });

  socket.on('list_item_bid', function(options, callback){
    let username = UserFacade.getUsername(socket);
    if (username === null){callback({error : 'user not logged in'});return;}
    AccountFacade.getAccount(username)
    .then((account)=>{
      return ListingFacade.createListing(options.itemId, options.price, options.duration, 'bid', account.id);
    })
    .then(()=>{
      callback({});
    })
    .catch((e)=>{
      console.log(e);
      callback({error : e});
    });
  });

  socket.on('list_item_buyout', function(options, callback){
    let username = UserFacade.getUsername(socket);
    if (username === null){callback({error : 'user not logged in'});return;}
    AccountFacade.getAccount(username)
    .then((account)=>{
      return ListingFacade.createListing(options.itemId, options.price, options.duration, 'buyout', account.id);
    })
    .then(()=>{
      callback({});
    })
    .catch((e)=>{
      console.log(e);
      callback({error : e});
    });
  });

  socket.on('cancel_listing', function(options, callback){
    ListingFacade.cancelListing(options.listingId)
    .then(()=>{
      callback({});
    })
    .catch((e)=>{
      console.log(e);
      callback({error : e});
    });
  });

  socket.on('bid_on_listing', function(options, callback){
    let username = UserFacade.getUsername(socket);
    if (username === null){callback({error : 'user not logged in'});return;}
    AccountFacade.getAccount(username)
    .then((account)=>{
      return ListingFacade.bidOnListing(account.id, options.listingId, options.amount);
    })
    .then(()=>{
      callback({});
    })
    .catch((e)=>{
      console.log(e);
      callback({error : e});
    });
  });

  socket.on('buyout_listing', function(options, callback){
    let username = UserFacade.getUsername(socket);
    if (username === null){callback({error : 'user not logged in'});return;}
    AccountFacade.getAccount(username)
    .then((account)=>{
      return ListingFacade.buyoutListing(account.id, options.listingId);
    })
    .then(()=>{
      callback({});
    })
    .catch((e)=>{
      console.log(e);
      callback({error : e});
    });
  });

  function getListingsData(listingFunc,callback, listings, bids){
    let zimages = [];
    let ztags = [];
    let zlistings = [];
    ItemFacade.getImageList()
    .then((images)=>{
      zimages = images; 
      return TagFacade.getAllTags();
    })
    .then((tags)=>{
      ztags = tags;
      return listings ? listings : listingFunc();
    })
    .then((listings)=>{
      zlistings = listings;
      let itemIds = [];
      listings.map((listing)=>{itemIds.push(listing.item.id);});
      return Promise.all([ListingFacade.getListingsMaxBids(listings),
       TagFacade.getAllItemsTagValues(itemIds)]);
    })
    .spread((maxBids, tagValues)=>{
      if(bids){ //TODO: we're returning duplicate data here
        callback({listings : zlistings,  
          images: zimages,
          tags : ztags,
          tagValues : tagValues,
          listingMaxBids : maxBids, bids : bids});
      } else {
        callback({listings : zlistings,  
          images: zimages,
          tags : ztags,
          tagValues : tagValues,
          listingMaxBids : maxBids});
      }
    })
    .catch((e)=>{
      console.log(e);
      callback({error : e});
    });
  }


  socket.on('view_bids', function(options, callback){
      return new Promise((resolve, reject)=>{
        let username = UserFacade.getUsername(socket);
        if (username === null){callback({error : 'user not logged in'});return;}
        AccountFacade.getAccount(username)
        .then((account)=>{
          return ListingFacade.getAccountBids(account.id);
        })
        .then((bids)=>{
          let listings = [];
          bids.map((b)=>{listings.push(b.listing);});
          return getListingsData(null,callback, listings, bids);
        });
      });
  });

  socket.on('view_account_listings', function(options, callback){
    return new Promise((resolve, reject)=>{
      let username = UserFacade.getUsername(socket);
      if (username === null){callback({error : 'user not logged in'});return;}
      AccountFacade.getAccount(username)
      .then((account)=>{
        return getListingsData(ListingFacade.getAccountListings.bind(null,account.id, options.search),callback);
      })
      .catch((e)=>{
        console.log(e);
      callback({error : e});
    });
  });
  });

  socket.on('view_listings', function(options, callback){
    return getListingsData(ListingFacade.getAllListings.bind(null, options.search),callback);
  });

  //options.username
  socket.on('get_account_id',function(options, callback){
    AccountFacade.getAccount(options.username)
    .then((account)=>{
      callback({username : account.username, id : account.id});
    })
    .catch((e)=>{
      console.log(e);
      callback({error : e});
    });
  });

  //options.details
  //options.email
  socket.on('modify_account', function(options, callback){
    let username = UserFacade.getUsername(socket);
    if (username === null){callback({error : 'user not logged in'});return;}
    Promise.all([AccountFacade.updateAccount(username, options.details), 
                 AccountFacade.updateAccountEmail(username, options.email)])
    .then(()=>{
      callback({});
    })
    .catch((e)=>{
      console.log(e);
      callback({error : e});
    });
  });


//options.messageId
socket.on('delete_message', function(options, callback){
  AccountFacade.deleteMessage(options.messageId)
  .then(()=>{
      callback(true);
    })
    .catch((e)=>{
      console.log(e);
      callback({error : e});
    });
});

//options.messageId
socket.on('read_message', function(options, callback){
  AccountFacade.setMessageRead(options.messageId)
  .then(()=>{
      callback(true);
    })
    .catch((e)=>{
      console.log(e);
      callback({error : e});
    });
});

/*
options.recipientId
options.title
options.message
*/
  socket.on('create_message', function(options, callback){
    let username = UserFacade.getUsername(socket);
    if (username === null){callback({error : 'user not logged in'});return;}
    AccountFacade.getAccount(username)
    .then((account)=>{
      return AccountFacade.sendMessage(account.id, options.recipientId, options.title, options.message);
    })
    .then(()=>{
      callback(true);
    })
    .catch((e)=>{
      console.log(e);
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

  socket.on('view_messages', function(callback){
    let username = UserFacade.getUsername(socket);
    if (username === null){callback({error : 'user not logged in'});return;}

    AccountFacade.getAccount(username)
    .then((account)=>{
      return AccountFacade.getAccountMessages(account.id);
    })
    .then((messages)=>{


      if(messages && messages.length > 0){
        let messageSenderIds= [];
        messages.map((msg)=>{messageSenderIds.push(msg.senderId);});
        AccountFacade.getAccountNameIds(messageSenderIds)
        .then((senders)=>{
          callback({messages : messages, senders : senders});
        });
      } else {
        callback({});
      }
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
      return ItemFacade.getAccountItems(accountId);
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

  socket.on('check_logged_in',(options, callback)=>{
    let username = UserFacade.getUsername(socket);
    if(username){
      callback({username : username});
    } else {
      callback({error : 'not logged in'});
    }
  });

  socket.on('logout',(options,callback)=>{
    UserFacade.logOut(socket);
    callback({});
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