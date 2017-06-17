let Utility = require('./utility.js');

//Note: call linkListingToItem afterwards
function createListing(startPrice, listTime, type, sellerId){
  let startDate = new Date();
  let startDateStr = Utility.getDateStr(startDate);
  let endDate = new Date();
  endDate.setTime(endDate.getTime() + listTime);
  let endDateStr = Utility.getDateStr(endDate);
  return "INSERT INTO listing (type, starting_price, expiry_date, creation_date, seller_id) \
  VALUES ('"+type+"', '"+startPrice+"', '"+endDateStr+"', '"+startDateStr+"', '"+sellerId+"') RETURNING id;";
}

//NOTE: there should only be one active listing per item
function getActiveListingsForItem(itemId){
  let curDate = new Date();
  let curDateStr = Utility.getDateStr(curDate);
  return "SELECT * FROM item_listing il \
   INNER JOIN listing l ON il.listing_id = l.id\
   WHERE item_id = '"+itemId+"' AND '"+curDateStr+"' < expiry_date;";
}

function linkListingToItem(itemId, listingId){
  return "INSERT INTO item_listing (item_id, listing_id) VALUES ('"+itemId+"', '"+listingId+"');";
}

function setListingSold(listingId){
  let curDate = new Date();
  let curDateStr = Utility.getDateStr(curDate);
  return "UPDATE listing SET sold = true, expiry_date='"+curDateStr+"' WHERE id = '"+listingId+"';";
}

function getListing(listingId){
  return "SELECT * FROM listing l INNER JOIN item_listing il ON il.listing_id = l.id\
   WHERE id = '"+listingId+"';";
}

function getAllExpiredListings(){
  let curDate = new Date();
  let curDateStr = Utility.getDateStr(curDate);
  return "SELECT * FROM listing  l INNER JOIN item_listing il ON il.listing_id = l.id WHERE '"+curDateStr+"' >= expiry_date;";
}

function getAllListings(){
  return "SELECT * FROM listing  l INNER JOIN item_listing il ON il.listing_id = l.id;";
}

function getAccountListings(accountId){
  return "SELECT * FROM listing  l INNER JOIN item_listing il ON il.listing_id = l.id\
  WHERE seller_id = '"+accountId+"';";
}

function cancelListing(itemId, listingId){
  return ["DELETE FROM item_listing WHERE item_id='"+itemId+"' AND listing_id='"+listingId+"';",
    "DELETE FROM listing WHERE id = '"+listingId+"';"];
}

function cancelAllListings(){
  return ["DELETE FROM item_listing WHERE 1=1;",
          "DELETE FROM listing WHERE 1=1;"];
}

function cancelAccountListings(accountId){
  return [  "DELETE FROM item_listing il USING listing l WHERE il.listing_id = l.id AND l.seller_id = '"+accountId+"';",
    "DELETE FROM listing WHERE seller_id = '"+accountId+"';"];
}

module.exports = {
  createListing : createListing,
  linkListingToItem : linkListingToItem,
  setListingSold : setListingSold,
  getListing : getListing,
  getAllListings : getAllListings,
  getAccountListings : getAccountListings,
  cancelListing : cancelListing,
  cancelAllListings : cancelAllListings,
  cancelAccountListings : cancelAccountListings,
  getAllExpiredListings : getAllExpiredListings,
  getActiveListingsForItem : getActiveListingsForItem
};