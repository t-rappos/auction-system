// /*
//   This file will act as a facade to create and remove test data for the server
// */
//
// let DB = require('./serverDB.js');
// let TransactionFactoryQueries = require('./transactionFactoryQueries.js');
// let ListingFactoryQueries = require('./listingFactoryQueries.js');
// let TagFactoryQueries = require('./tagFactoryQueries.js');
// let ItemFactoryQueries = require('./itemFactoryQueries.js');
// let MessageFactoryQueries = require('./messageFactoryQueries.js');
// let AccountFactoryQueries = require('./accountFactoryQueries.js');
// let Utility = require('./utility.js');
//
// /*
// TODO: can we make a linked list type data structure, so we can do account.destroyAll()
// which will call destroy on all dependant factories
//
// same with accountFactory.destroy(accountId)
//
// */
//
// function clearAllData(){
//   return new Promise((resolve, reject)=>{
//     DB.doSingle(TransactionFactoryQueries.removeAllTransactions())
//     .then(()=>{
//       return DB.doSingle(ListingFactoryQueries.cancelAllListings()[0]);
//     })
//     .then(()=>{
//       return DB.doSingle(ListingFactoryQueries.cancelAllListings()[1]);
//     })
//     .then(()=>{
//       return DB.doSingle(TagFactoryQueries.removeAllTagValues());
//     })
//     .then(()=>{
//       return DB.doSingle(TagFactoryQueries.removeAllTags());
//     })
//     .then(()=>{
//       return DB.doSingle(ItemFactoryQueries.removeAllItems());
//     })
//     .then(()=>{
//       return DB.doSingle(ItemFactoryQueries.removeAllImages());
//     })
//     .then(()=>{
//       return DB.doSingle(MessageFactoryQueries.deleteAllMessages()[0]);
//     })
//     .then(()=>{
//       return DB.doSingle(MessageFactoryQueries.deleteAllMessages()[1]);
//     })
//     .then(()=>{
//       return DB.doSingle(AccountFactoryQueries.destroyAllAccounts());
//     })
//     .then(resolve)
//     .catch((e)=>{
//       Utility.logError(e);
//     });
//   });
// }
//
// function clearAllTransactions(){
//   console.log('clear transactions');
//   return DB.doSingle(TransactionFactoryQueries.removeAllTransactions());
// }
//
// function clearAllListings(){
//   return new Promise((resolve, reject)=>{
//     console.log('clear listings');
//     DB.doSingle(TransactionFactoryQueries.removeAllTransactions())
//     .then(()=>{
//       console.log('clear listings 1');
//       return DB.doSingle(ListingFactoryQueries.cancelAllListings()[0]);
//     })
//     .then(()=>{
//       console.log('clear listings 2');
//       return DB.doSingle(ListingFactoryQueries.cancelAllListings()[1]);
//     })
//     .then(resolve)
//     .catch((e)=>{Utility.logError(e);});
//   });
// }
//
// function clearAllTagValues(){
//   return DB.doSingle(TagFactoryQueries.removeAllTagValues());
// }
//
// function clearAllTags(){
//   return new Promise((resolve, reject)=>{
//     console.log('clear all tags');
//     DB.doSingle(TagFactoryQueries.removeAllTagValues())
//     .then(()=>{
//       console.log('clear tags 1');
//       return DB.doSingle(TagFactoryQueries.removeAllTags());
//     })
//     .then(resolve)
//     .catch((e)=>{Utility.logError(e);});
//   });
// }
//
// function clearAllItems(){
//   return new Promise((resolve, reject)=>{
//     console.log('clear items');
//     clearAllListings()
//     .then(()=>{
//       return clearAllTagValues();
//     })
//     .then(()=>{
//       console.log('clear items 1');
//       return DB.doSingle(ItemFactoryQueries.removeAllItems());
//     })
//     .then(resolve)
//     .catch((e)=>{Utility.logError(e);});
//   });
// }
//
// function clearAllImages(){
//   return new Promise((resolve, reject)=>{
//     clearAllItems()
//     .then(()=>{
//       return DB.doSingle(ItemFactoryQueries.removeAllImages());
//     })
//     .then(resolve)
//     .catch((e)=>{Utility.logError(e);});
//   });
// }
//
// function clearAllMessages(){
//   return new Promise((resolve, reject)=>{
//     console.log('clear messages 1');
//     DB.doSingle(MessageFactoryQueries.deleteAllMessages()[0])
//     .then(()=>{
//       console.log('clear messages 2');
//       return DB.doSingle(MessageFactoryQueries.deleteAllMessages()[1]);
//     })
//     .then(resolve)
//     .catch((e)=>{Utility.logError(e);});
//   });
// }
//
// function clearAllAccounts(){
//   return new Promise((resolve, reject)=>{
//     console.log('clear accounts');
//     clearAllItems()
//     .then(()=>{
//       return clearAllMessages();
//     })
//     .then(()=>{
//       return DB.doSingle(AccountFactoryQueries.destroyAllAccounts());
//     })
//     .then(resolve)
//     .catch((e)=>{Utility.logError(e);});
//   });
// }
//
// /*TransactionFactory.removeAllTransactions()
// .then(()=>{
//   return ListingFactory.cancelAllListings();
// })
// .then(()=>{
//   return ItemFactory.removeAllItems();
// })
// .then(()=>{
//   return AccountFactory.destroyAllAccounts();*/
//
// /*
// AccountFactory.createAccount('tftom2', 'password', 'tftom@gmail.com2', '1000')
// .then((account)=>{
//   expect(account).toExist('account');
//   testAccountId2 = account.getId();
//   expect(testAccountId2).toBe(account.getId());
//   return AccountFactory.createAccount('tftom', 'password', 'tftom@gmail.com', '1000');
// })
// .then((account)=>{
//   expect(account).toExist('account2');
//   testAccountId = account.getId();
//   return ItemFactory.createItem('tfTestItemName', 'itemDesc', 'www.itemUrl.com', testAccountId);
// })
// .then((item)=>{
//   expect(item).toExist('item');
//   testItemId = item.getId();
//   return ListingFactory.createListing(testItemId, 100, 3600*24, 'bid', testAccountId);
// })
// .then((listing)=>{
//   expect(listing).toExist('listing');
//   testListingId = listing.getId();
// })
// .then(()=>{
//   return ItemFactory.createItem('tfTestItemName2', 'itemDesc2', 'www.itemUrl.com2', testAccountId);
// })
// .then((item)=>{
//   expect(item).toExist('item2');
//   testItemId2 = item.getId();
//   return ListingFactory.createListing(testItemId2, 100, 3600*24, 'bid', testAccountId);
// })
// .then((listing)=>{
//   expect(listing).toExist('listing');
//   testListingId2 = listing.getId();
//   done();
// */
//
// module.exports = {
//   clearAllData : clearAllData,
//   clearAllTransactions : clearAllTransactions,
//   clearAllListings : clearAllListings,
//   clearAllTagValues : clearAllTagValues,
//   clearAllTags : clearAllTags,
//   clearAllItems : clearAllItems,
//   clearAllImages : clearAllImages,
//   clearAllMessages : clearAllMessages,
//   clearAllAccounts : clearAllAccounts
// };
