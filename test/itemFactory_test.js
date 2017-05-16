var expect = require('expect');
//let Utility = require('../lib/utility.js');
//let Item = require('../lib/item.js');
let AccountFactory = require('../lib/accountFactory.js');
let ItemFactory = require('../lib/itemFactory.js');

const itemImageUrl = 'https://members.dd-on.jp/common/img/item/item/bb8a558c6b1f1a1cf12e08c49dd0a17d.png';

describe('ItemFactory',function(){

let accountId = 0;
let accountId2 = 0;

  it('should exist',function(done){
    expect(ItemFactory).toExist();
    AccountFactory.destroyAllAccounts()
    .then(()=>{
      return AccountFactory.createAccount('tom', 'tom-password', 'tom@tom.tom');
    })
    .then((account)=>{
      accountId = account.getId();
      return ItemFactory.removeAllItems();
    })
    .then(()=>{
      return ItemFactory.getAllItems();
    })
    .then((items)=>{
      expect(items.length).toBe(0);
      return AccountFactory.createAccount('tom2', 'tom-password', 'tom@tom.tom');
    })
    .then((account2)=>{
      accountId2 = account2.getId();
      done();
    });
  });

  it('should be able to create item',function(done){
    ItemFactory.removeAllItems()
    .then(() => {
      return ItemFactory.createItem('broom handle', 'dusty',itemImageUrl, accountId);
    })
    .then((item) =>{
      expect(item).toExist().toNotBe(null).toNotBe('undefined');
      expect(item.getName()).toBe('broom handle');
      return ItemFactory.getAllItems();
    })
    .then((items)=>{
      expect(items.length).toBe(1);
      done();
    });
  });

  it('should be able to remove item',function(done){
    ItemFactory.removeAllItems()
    .then(() => {
      return ItemFactory.createItem('broom handle', 'dusty',itemImageUrl, accountId);
    })
    .then(item=>{
      return ItemFactory.removeItem(item);
    })
    .then(()=>{
      return ItemFactory.getAllItems();
    })
    .then(items=>{
      expect(items.length).toBe(0);
      done();
    });
  });

  it('should be able to remove all items',function(done){
    ItemFactory.removeAllItems()
    .then(() => {
      return Promise.all([ItemFactory.createItem('broom handle', 'dusty',itemImageUrl, accountId),
                          ItemFactory.createItem('broom handle2', 'dusty', itemImageUrl, accountId),
                          ItemFactory.createItem('broom handle3', 'dusty', itemImageUrl, accountId2)]);
    })
    .then(()=>{
      return ItemFactory.getAllItems();
    })
    .then((items)=>{
      expect(items.length).toBe(3);
      return ItemFactory.removeAllItems();
    })
    .then(()=>{
      return ItemFactory.getAllItems();
    })
    .then(items=>{
      expect(items.length).toBe(0);
      done();
    });
  });

  it('should be able to get account items',function(done){
    ItemFactory.removeAllItems()
    .then(() => {
      return Promise.all([ItemFactory.createItem('broom handle', 'dusty',itemImageUrl, accountId),
                          ItemFactory.createItem('broom handle2', 'dusty', itemImageUrl, accountId),
                          ItemFactory.createItem('broom handle3', 'dusty', itemImageUrl, accountId2)]);
    })
    .then(()=>{
      return ItemFactory.getAccountItems(accountId);
    })
    .then((items)=>{
      expect(items.length).toBe(2);
      return ItemFactory.removeAllItems();
    })
    .then(()=>{
      return ItemFactory.getAllItems();
    })
    .then(items=>{
      expect(items.length).toBe(0);
      done();
    });
  });

  it('should deinitialise',function(done){
    AccountFactory.destroyAllAccounts().then(function(){
      return ItemFactory.removeAllItems();
    })
    .then(function(){
      done();
    });
  });
});
