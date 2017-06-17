class Transaction{
  constructor(id, amount, creationDate, bidderId, listingId){
    this.id = id;
    this.amount = amount;
    this.creationDate = creationDate;
    this.bidderId = bidderId;
    this.listingId = listingId;
  }

  getId(){return this.id;}
  getAmount(){return this.amount;}
  getCreationDate(){return this.creationDate;}
  getBidderId(){return this.bidderId;}
  getListingId(){return this.listingId;}
}

module.exports = {
  Transaction : Transaction
};
