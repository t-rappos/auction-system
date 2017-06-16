// var expect = require('expect');
// let Utility = require('../lib/utility.js');
// let AccountFactory = require('../lib/accountFactory.js');
// let ItemFactory = require('../lib/itemFactory.js');
// let TransactionFactory = require('../lib/transactionFactory.js');
// let ListingFactory = require('../lib/listingFactory.js');
// let UtilData = require('../lib/utilData.js');
//
// const itemImageUrl = 'https://members.dd-on.jp/common/img/item/item/bb8a558c6b1f1a1cf12e08c49dd0a17d.png';
//
// describe('ItemFactory',function(){
//
// let accountId = 0;
// let accountId2 = 0;
//
//   it('should exist',function(done){
//     TransactionFactory.removeAllTransactions()
//     .then(()=>{
//       return ListingFactory.cancelAllListings();
//     })
//     .then(()=>{
//       return AccountFactory.destroyAllAccounts();
//     })
//     .then(()=>{
//       return AccountFactory.createAccount('tom', 'tom-password', 'tom@tom.tom');
//     })
//     .then((account)=>{
//       accountId = account.getId();
//       return ItemFactory.removeAllItems();
//     })
//     .then(()=>{
//       return ItemFactory.getAllItems();
//     })
//     .then((items)=>{
//       expect(items.length).toBe(0);
//       return AccountFactory.createAccount('tom2', 'tom-password', 'tom@tom.tom');
//     })
//     .then((account2)=>{
//       accountId2 = account2.getId();
//       done();
//     }).catch(function(e){
//       Utility.logError(e);
//     });
//   });
//
//   it('should be able to add image',function(done){
//     /*function createImage(name, url){
//       return DB.doSingle(Queries.createImage(name,url));
//     }
//
//     function getImageList(){
//       return DB.getMany(Queries.getAllImages(), (row)=>{
//         return {name : row.name, url : row.url};
//       });
//     }*/
//     ItemFactory.removeAllImages()
//     .then(()=>{
//       return ItemFactory.createImage('image1','imageUrl');
//     })
//     .then(()=>{
//       return ItemFactory.getImageList();
//     })
//     .then((il)=>{
//       expect(il).toExist();
//       expect(il[0].name).toBe('image1');
//       expect(il[0].url).toBe('imageUrl');
//       done();
//     })
//     .catch((e)=>{
//       Utility.logError(e);
//     });
//   });
//
//   let testItemId =null;
//   it('should be able to create item',function(done){
//     ItemFactory.removeAllItems()
//     .then(() => {
//       return ItemFactory.createItem('broom handle', 'dusty',itemImageUrl, accountId);
//     })
//     .then((item) =>{
//       testItemId = item.getId();
//       expect(item).toExist().toNotBe(null).toNotBe('undefined');
//       expect(item.getName()).toBe('broom handle');
//       return ItemFactory.getAllItems();
//     })
//     .then((items)=>{
//       expect(items.length).toBe(1);
//       done();
//     })
//     .catch(function(e){
//       Utility.logError(e);
//     });
//   });
//
//   it('should be able to transfer item', function(done){
//     ItemFactory.getAccountItems(accountId).
//     then((items)=>{
//       expect(items.length).toBe(1, 'giver has item');
//       expect(items[0].getId()).toBe(testItemId, 'item is correct id');
//       return ItemFactory.transferItem(testItemId, accountId2);
//     })
//     .then(()=>{
//       return Promise.all([ItemFactory.getAccountItems(accountId),
//         ItemFactory.getAccountItems(accountId2)]);
//     })
//     .then((results)=>{
//       expect(results[0].length).toBe(0, 'giver has no items');
//       expect(results[1].length).toBe(1, 'recipient has item');
//       expect(results[1][0].getId()).toBe(testItemId, 'item is correct id 2');
//       done();
//     }).catch((e)=>{
//       Utility.logError(e);
//     });
//   });
//   testItemId =null;
//
//   it('should be able to remove item',function(done){
//     ItemFactory.removeAllItems()
//     .then(() => {
//       return ItemFactory.createItem('broom handle', 'dusty',itemImageUrl, accountId);
//     })
//     .then(item=>{
//       return ItemFactory.removeItem(item);
//     })
//     .then(()=>{
//       return ItemFactory.getAllItems();
//     })
//     .then(items=>{
//       expect(items.length).toBe(0);
//       done();
//     }).catch(function(e){
//       Utility.logError(e);
//     });
//   });
//
//   it('should be able to remove all items',function(done){
//     ItemFactory.removeAllItems()
//     .then(() => {
//       return Promise.all([ItemFactory.createItem('broom handle', 'dusty',itemImageUrl, accountId),
//                           ItemFactory.createItem('broom handle2', 'dusty', itemImageUrl, accountId),
//                           ItemFactory.createItem('broom handle3', 'dusty', itemImageUrl, accountId2)]);
//     })
//     .then(()=>{
//       return ItemFactory.getAllItems();
//     })
//     .then((items)=>{
//       expect(items.length).toBe(3);
//       return ItemFactory.removeAllItems();
//     })
//     .then(()=>{
//       return ItemFactory.getAllItems();
//     })
//     .then(items=>{
//       expect(items.length).toBe(0);
//       done();
//     }).catch(function(e){
//       Utility.logError(e);
//     });
//   });
//
//   it('should be able to get account items',function(done){
//     ItemFactory.removeAllItems()
//     .then(() => {
//       return Promise.all([ItemFactory.createItem('broom handle', 'dusty',itemImageUrl, accountId),
//                           ItemFactory.createItem('broom handle2', 'dusty', itemImageUrl, accountId),
//                           ItemFactory.createItem('broom handle3', 'dusty', itemImageUrl, accountId2)]);
//     })
//     .then(()=>{
//       return ItemFactory.getAccountItems(accountId);
//     })
//     .then((items)=>{
//       expect(items.length).toBe(2);
//       return ItemFactory.removeAllItems();
//     })
//     .then(()=>{
//       return ItemFactory.getAllItems();
//     })
//     .then(items=>{
//       expect(items.length).toBe(0);
//       done();
//     }).catch(function(e){
//       Utility.logError(e);
//     });
//   });
//
//   it('should deinitialise',function(done){
//     UtilData.clearAllData()
//     .then(done)
//     .catch(function(e){
//       Utility.logError(e);
//     });
//   });
// });
