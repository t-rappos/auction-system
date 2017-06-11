let Utility = require('./utility.js');

class Listing{
  //TODO: make sure there is only one instance of any item at any time...
  //store id in map, if already there then return reference to that?
  constructor(id, itemId, type, startPrice, createTime, endTime, sellerId, isSold){
    this.id = id;
    this.itemId = itemId;
    this.type = type;
    this.startPrice = startPrice;
    this.creationDate = createTime;
    this.expiryDate = endTime;
    this.sellerId = sellerId;
    this.sold = isSold;
    this._setSoldFn = ()=>{};
  }

  shallowCopy(otherListing){
    if (otherListing){
      this.id = otherListing.id;
      this.itemId = otherListing.itemId;
      this.type = otherListing.type;
      this.startPrice = otherListing.startPrice;
      this.creationDate = otherListing.creationDate;
      this.expiryDate = otherListing.expiryDate;
      this.sellerId = otherListing.sellerId;
      this.sold = otherListing.sold;
    } else {
      this.id = null;
      this.itemId = null;
      this.type = null;
      this.startPrice = null;
      this.creationDate = null;
      this.expiryDate = null;
      this.sellerId = null;
      this.sold = null;
    }
  }

  destroy(){this.shallowCopy(null);}

  //TODO: update getters to return new values if db instance has changed
  hasExpired(){
    let curDate = new Date();
    let expireDate =new Date(this.getExpiryDate());
    return curDate >= expireDate;
  }

  getItemId(){return this.itemId;}
  getType(){return this.type;}
  getId(){return this.id;}
  getStartPrice(){return this.startPrice;}
  getCreationDate(){return this.creationDate;}
  getExpiryDate(){return this.expiryDate;}
  getSellerId(){return this.sellerId;}
  setSold(){
    //TODO: think about : can we sell an item that has (just) expired
    return new Promise((resolve, reject)=>{
      let timeSinceExpiry = new Date() - this.getExpiryDate();
      //if its been 10 seconds since expiry, we should complain
      if(timeSinceExpiry > 10000){
        Utility.logWarning("error: listing: setSold: attempting to sell an expired item");
      }
      resolve(this._setSoldFn());
    });
  }
  isSold(){return this.sold;}
}

module.exports = {
  Listing : Listing
};
