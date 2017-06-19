var db = require('./serverPGDB.js'); //TODO: abstract this out?
//var Tables = require('./serverDBTables.js');
let Utility = require('./utility.js');
var Sequelize = require('sequelize');

//returns promise
function query(msg){
  return db.query(msg);
}

function doSingle(q, postFn){
  if (postFn == undefined){postFn = ()=>{};}
  return new Promise((resolve, reject)=>{
    query(q)
    .then(()=>{
      postFn();
      resolve();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });
}

//fillFn should take a row and return the object
//will resolve null if nothing is found
function getSingle(q, fillFn){
  return new Promise((resolve, reject)=>{
    query(q)
    .then((result)=>{
      if(result && result.rows && result.rows.length > 0){
        resolve(fillFn(result.rows[0]));
      } else {
        resolve(null);
      }
    }).catch((e)=>{
      Utility.logError(e);
    });
  });
}

//fillFn should take a row and return the object
//will resolve [] if nothing is found
function getMany(q, fillFn){
  return new Promise((resolve, reject)=>{
    let objects = [];
    query(q)
    .then((result)=>{
      if(result && result.rows && result.rows.length > 0){
        result.rows.map((row)=>{
          objects.push(fillFn(row));
        });
      }
      resolve(objects);
    }).catch((e)=>{
      Utility.logError(e);
    });
  });
}

var Tag = null;
var Account = null;
var Image = null;
var Item = null;
var TagValue = null;
var Message = null;
var Listing = null;

function getTag() {return Tag;}
function getAccount(){return Account;}
function getImage(){return Image;}
function getItem(){return Item;}
function getTagValue(){return TagValue;}
function getMessage(){return Message;}
function getListing(){return Listing;}

function initialise(onSuccess){
  return new Promise((resolve, reject)=>{
    if (!db.isConnected()){
      Utility.log('serverDB:initialise');
      db.connect()
      .then(()=>{
        Utility.log('serverDB: connected');
        Tag = require('./model/tag.js').Tag(db.s(), Sequelize);
        Account = require('./model/account.js').Account(db.s(),Sequelize );
        Image = require('./model/image.js').Image(db.s(),Sequelize);
      })
      .then(()=>{
        return Promise.all([Tag.sync({force:true}),
                            Account.sync({force:true}),
                            Image.sync({force:true})]);
      })
      .then(()=>{
        Item = require('./model/item.js').Item(db.s(), Sequelize, Account, Image);
        return Item.sync({force:true});
      })
      .then(()=>{
        TagValue = require('./model/tagValue.js').TagValue(db.s(), Sequelize, Tag, Item);
        return TagValue.sync({force:true});
      })
      .then(()=>{
        Message = require('./model/message.js').Message(db.s(),Sequelize,Account);
        return Message.sync({force:true});
      })
      .then(()=>{
        Listing = require('./model/listing.js').Listing(db.s(),Sequelize,Account, Item);
        return Listing.sync({force:true});
      })
      .then(resolve)
      .catch(function(e){
        Utility.logError(e);
      });
    } else {
      Utility.logWarning('serverDB: is already connected!');
      resolve();
    }
  });
}

module.exports =
{
  getListing : getListing,
  getMessage : getMessage,
  getAccount : getAccount,
  getTag:getTag,
  getImage : getImage,
  getItem : getItem,
  getTagValue : getTagValue,
  initialise:initialise,
  query:query,
  getMany : getMany,
  getSingle : getSingle,
  doSingle : doSingle
};
