class Transaction{
  constructor(id, amount, creationDate, bidderId, listingId){
    this.id = id;
    this.amount = amount;
    this.creationDate = creationDate;
    this.bidderId = bidderId;
    this.listingId = listingId;
    //this.pending = true;
    //this.successful = false;
  }
  getId(){return this.id;}
  getAmount(){return this.amount;}
  getCreationDate(){return this.creationDate;}
  getBidderId(){return this.bidderId;}
  getListingId(){return this.listingId;}
  //isPending(){return this.pending;}
  //wasSuccessful(){return this.successful;}
}

module.exports = {
  Transaction : Transaction
};
