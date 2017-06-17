let Utility = require('./utility.js');

function createTransaction(amount, accountId, listingId){
  let date = Utility.getDateStr(new Date());
  return "INSERT INTO bid (amount, creation_date, bidder_id, listing_id) \
  VALUES ('"+amount+"', '"+date+"', '"+accountId+"', '"+listingId+"') RETURNING *;";
}

function getTransaction(id){
  return "SELECT * FROM bid WHERE id = '"+id+"';";
}

function getAllTransactions(){
  return "SELECT * FROM bid;";
}

function removeTransaction(id){
  return "DELETE FROM bid WHERE id = '"+id+"';";
}

function removeAllTransactions(){
  return "DELETE FROM bid WHERE 1=1;";
}

function getLastTransactions(listingId){
  return "SELECT * FROM bid WHERE listing_id = '"+listingId+"' ORDER BY amount DESC;";
}

function removeListingTransactions(listingId){
  return "DELETE FROM bid where listing_id = '"+listingId+"';";
}

module.exports = {
  createTransaction : createTransaction,
  getTransaction : getTransaction,
  getAllTransactions : getAllTransactions,
  removeTransaction : removeTransaction,
  removeAllTransactions : removeAllTransactions,
  getLastTransactions : getLastTransactions,
  removeListingTransactions : removeListingTransactions
};
