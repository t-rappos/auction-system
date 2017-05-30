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
    return new Promise((resolve, reject)=>{
      console.log("set sold called");
      if (!this.hasExpired()){
        console.log("set sold called : calling callback");
        resolve(this._setSoldFn());
      } else {
        throw new Error('expired');
      }
    });
  }
  isSold(){return this.sold;}
}

module.exports = {
  Listing : Listing
};
