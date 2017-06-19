var expect = require('expect');
let TagFacade = require('../lib/facade/tag.js');
let Utility = require('../lib/utility.js');
let ownerAccount = null;

describe('TagFacade',function(){

  it('should be able to init tests', function(done){
    let ItemFacade = require("../lib/facade/item.js");
    require("../lib/facade/account.js").createAccount('testAccount2', "test@acount.com", 'password')
    .then((acc)=>{
      ownerAccount = acc;
      return Promise.all([ItemFacade.createTestItem('bronzesword', 'description', 1337,ownerAccount.id),//{id: 1337, name: 'brone sword', description: 'description'}),
        ItemFacade.createTestItem('bronzesword', 'description', 1338,ownerAccount.id),
        ItemFacade.createTestItem('bronzesword', 'description', 1339,ownerAccount.id)]);
    })
    .then(()=>{
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it('should exist',function(done){
    expect(TagFacade).toExist();
    done();
  });

  it('should be able to create item tag value', function(done){
    Promise.all([TagFacade.createItemTagValue(1337,'quality', '+1'),
      TagFacade.createItemTagValue(1338,'quality', '+2'),
      TagFacade.createItemTagValue(1339,'quality', '+3'),
      TagFacade.createItemTagValue(1337,'durability', 100)
    ])
    .then(()=>{
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it('should be able to get tag enum values', function(done){
    TagFacade.getTagEnumValues('quality')
    .then((res)=>{
      expect(res.length).toBe(3);
      expect(res[0].value).toBe('+1');
      done();
    })
    .catch((e)=>{
      console.log(e);
    });
  });

  it('should be able to get all tags', function(done){
    TagFacade.getAllTags()
    .then((res)=>{
      expect(res.length).toBe(2);
      expect(res[0].name).toBe('quality');
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it('should be able to do cleanup', function(done){
    TagFacade.removeAllItemTagValues()
    .then(()=>{
      return require("../lib/facade/item.js").removeAllItems();
    })
    .then(()=>{
      return TagFacade.removeAllTags();
    })
    .then(()=>{
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });
});
