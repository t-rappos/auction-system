class Listing{
  constructor(id, itemId, type, startPrice, createTime, endTime, sellerId, isSold){
    this.id = id;
    this.itemId = itemId;
    this.type = type;
    this.startPrice = startPrice;
    this.creationDate = createTime;
    this.expiryDate = endTime;
    this.sellerId = sellerId;
    this.sold = isSold;
    Object.freeze(this);
  }
  //TODO: make sure there is only one instance of any item at any time...
  getItemId(){return this.itemId;}
  getType(){return this.type;}
  getId(){return this.id;}
  getStartPrice(){return this.startPrice;}
  getCreationDate(){return this.creationDate;}
  getExpiryDate(){return this.expiryDate;}
  getSellerId(){return this.sellerId;}
  isSold(){return this.sold;}
}

module.exports = {
  Listing : Listing
};
