/////////////
// CALLBACKS//
/////////////

import io from 'socket.io-client';

let Promise = require('bluebird');
let socket = io();
let ToastStore = require('../components/toast/toastStore.jsx');
socket.emitAsync = Promise.promisify(socket.emit);

let store = require('../redux/wrapper.jsx').store;
let actions = require('../redux/actions.jsx');
//import {connect} from 'react-router';

//a callback

//function safeCall(callback, data){
//  if (typeof(callback)==='function'){
//    callback(data);
//  } else {
//     throw new Error("safecall expected a function");
//   }
//}

socket.on('outbid', ()=>{
  ToastStore.push('outbid on item', 5000, 'update');
  store.dispatch(actions.refreshItems());
});

socket.on('item_won', ()=>{
  ToastStore.push('a bid has been won', 5000, 'update');
  store.dispatch(actions.refreshItems());
});

socket.on('listing_expired', ()=>{
  ToastStore.push('a listing has expired', 5000, 'update');
  store.dispatch(actions.refreshItems());
});

socket.on('new_message', ()=>{
   ToastStore.push('new message arrived', 5000, 'update');
   store.dispatch(actions.refreshMessages());
});

socket.on('item_sold', ()=>{
   ToastStore.push('item sold', 5000, 'update');
   store.dispatch(actions.refreshItems());
});


//var serverApiOnLoginCallback;
//socket.on('login', function(username){
//  safeCall(serverApiOnLoginCallback,username);
//});


function makeRequest(name, options, callback){
  return new Promise((resolve, reject)=>{
    socket.emit(name, options, callback);
  });
}

function sendMessageDeleteRequest(messageId, callback){
  return new Promise((resolve, reject)=>{
    let options = {messageId : messageId};
    socket.emit('delete_message', options, callback);
  });
}

function sendMessageReadRequest(messageId, callback){
  return new Promise((resolve, reject)=>{
    let options = {messageId : messageId};
    socket.emit('read_message', options, callback);
  });
}

function sendTagViewRequest(callback){
  return new Promise((resolve, reject)=>{
    socket.emit('view_tags', callback);
  });
}

function sendMessageCreationRequest(recipientId, title, message, callback){
  let options = {recipientId : recipientId, title : title, message : message};
   return new Promise((resolve, reject)=>{
    socket.emit('create_message',options, callback);
  });
}

function sendMessageListViewRequest(callback){
   return new Promise((resolve, reject)=>{
    socket.emit('view_messages', callback);
  });
}

function sendItemCreationRequest(imageId, name, desc, tagNames, tagValues, callback){
  let options = {imageId : imageId, name : name, desc: desc, tagNames : tagNames, tagValues : tagValues};
  return new Promise((resolve, reject)=>{
    socket.emit('create_item', options, callback);
  });
}

function sendImageListViewRequest(callback){
  return new Promise((resolve, reject)=>{
    socket.emit('view_images', callback);
  });
}

function sendInventoryViewRequest(callback){
  return new Promise((resolve, reject)=>{
    socket.emit('view_items', callback);
  });
}

function sendAccountModifyRequest(email, details, callback){
  let options = {email : email, details : details};
  return new Promise((resolve, reject)=>{
    socket.emit('modify_account', options, callback);
  });
}

function sendAccountViewRequest(callback){
  return new Promise((resolve, reject)=>{
    socket.emit('view_account', callback);
  });
}

function sendUserLoginRequest(username, password){
  return new Promise((resolve, reject)=>{
    socket.emit('login',{username : username, password : password}, (res)=>{
      resolve(res);
    });
  });
}

function sendAccountCreationRequest(username, email, password){
  return new Promise((resolve, reject)=>{
    socket.emit('create_account', {username: username, email : email, password : password}, (res)=>{
      resolve(res);
    });
  });
}

module.exports = {
  
  sendViewBidsRequest : (callback) => {makeRequest('view_bids', {}, callback);},

  sendListItemBidRequest : (itemId, price, duration, callback)=>{
    makeRequest('list_item_bid', {itemId : itemId, price : price, duration : duration}, callback);},

  sendListItemBuyoutRequest : (itemId, price, duration, callback)=>{
    makeRequest('list_item_buyout', {itemId : itemId, price : price, duration : duration}, callback);},

  sendCancelListingRequest : (listingId, callback)=>{
    makeRequest('cancel_listing', {listingId : listingId}, callback);},

  sendBidOnListingRequest : (listingId, amount, callback)=>{
    makeRequest('bid_on_listing', {listingId : listingId, amount : amount}, callback);},

  sendBuyoutListingRequest : (listingId, callback)=>{
    makeRequest('buyout_listing', {listingId : listingId}, callback);},

  sendViewAccountListingsRequest : (searchCommand, callback)=>{
    makeRequest('view_account_listings',searchCommand?{search : searchCommand}:{}, callback);},

  sendViewListingsRequest : (searchCommand, callback)=>{
    makeRequest('view_listings', searchCommand?{search : searchCommand}:{}, callback);},

  sendAccountIdRequest : (username, callback)=>{
    makeRequest('get_account_id', {username : username}, callback);},

  sendAccountCreationRequest : sendAccountCreationRequest,
  sendAccountModifyRequest : sendAccountModifyRequest,
  sendAccountViewRequest : sendAccountViewRequest,

  sendMessageDeleteRequest  : sendMessageDeleteRequest,
  sendMessageReadRequest  : sendMessageReadRequest,
  sendMessageCreationRequest : sendMessageCreationRequest,
  sendMessageListViewRequest : sendMessageListViewRequest,

  sendInventoryViewRequest : sendInventoryViewRequest,
  sendItemCreationRequest : sendItemCreationRequest,

  sendDestroyItemRequest : (itemId, callback)=>{
    makeRequest('destroy_item', {itemId : itemId}, callback);},

  sendImageListViewRequest : sendImageListViewRequest,
  sendTagViewRequest : sendTagViewRequest,
  sendUserLoginRequest : sendUserLoginRequest,

  sendUserLogoutRequest : (callback)=>{
    makeRequest('logout',{},callback);},

  sendUserCheckLoggedInRequest : (callback) => {
    makeRequest('check_logged_in',{},callback);}
  
////////////////////
//Public CALLBACKS//
////////////////////

//calls an external function when a new message is sent from the server
/*
setOnMessageCallback: function(callback){
  serverApiOnMessageCallback = callback;
},
*/

/////////////////////
//Public server API//
/////////////////////

/*Emit message*/
/*
getUserList: function(callback){
  socket.emit('get_users', function(users){
      callback(users);
  });
},
*/

};
