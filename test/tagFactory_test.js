let expect = require('expect');
let TagFactory = require('../lib/tagFactory.js');
let Utility = require('../lib/utility.js');
let AccountFactory = require('../lib/accountFactory.js');
let ItemFactory = require('../lib/itemFactory.js');
let UtilData = require('../lib/utilData.js');

let testAccountId = null;
let testItemId = null;
let testItemId2 = null;

function createTestAccount(){
  return AccountFactory.destroyAllAccounts()
  .then(()=>{
    return AccountFactory.createAccount('tom', 'tom-password', 'tom@tom.tom');
  })
  .then((account)=>{
    testAccountId = account.getId();
    expect(testAccountId).toNotBe(null);
  }).catch((e)=>{
    Utility.logError(e);
  });
}

function createTestItem(){
  return ItemFactory.removeAllItems()
  .then(()=>{
    return ItemFactory.createItem('broom handle', 'dusty',"dsfdsf", testAccountId);
  })
  .then((item)=>{
    testItemId = item.getId();
    return ItemFactory.createItem('broom handle2', 'dusty2',"dsfdsf2", testAccountId);
  })
  .then((item)=>{
    testItemId2 = item.getId();
    expect(testItemId).toNotBe(null);
    expect(testItemId2).toNotBe(null);
  }).catch((e)=>{
    Utility.logError(e);
  });
}

function destroyTestItem(){
  testItemId = null;
  return ItemFactory.removeAllItems();
}

function destroyTestAccount(){
  testAccountId = null;
  return AccountFactory.destroyAllAccounts();
}


describe('TagFactory',function(){
  it('should be able to do intial cleanup', function(done){
    TagFactory.removeAllTags()
    .then(()=>{
      done();
    }).catch((e)=>{
      Utility.logError(e);
    });
  });

  it("should exist",function(done){
    expect(TagFactory).toExist();
    done();
  });

  it('should be able to get no tags', function(done){
    TagFactory.getAllTags()
    .then((tags)=>{
      expect(tags.length).toBe(0);
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it("should be able to create tag",function(done){
    Promise.all([TagFactory.createTag("value"),
                TagFactory.createTag("quantity"),
                TagFactory.createTag("quality")])
    .then((results)=>{
      expect(results[0]).toExist().toNotBe(null).toNotBe('');
      done();
    }).catch(function(e){
      Utility.logError(e);
    });
  });

  it("should be able to get tag",function(done){
    TagFactory.getTag("value").then((result)=>{
      expect(result).toExist().toNotBe(null).toNotBe('');
      done();
    }).catch(function(e){
      Utility.logError(e);
    });
  });

  it("should be able to get tag name",function(done){
    TagFactory.getTag("value").then((result)=>{
      expect(result.getName()).toBe("value");
      done();
    }).catch(function(e){
      Utility.logError(e);
    });
  });

  //TODO: tag name validation
    //less than 16 characters
    //no symbols

  it("should be able to get tag id",function(done){
      TagFactory.getTag("value").then((result)=>{
        expect(result.getId()).toNotBe(null).toNotBe('');
        done();
    }).catch(function(e){
      Utility.logError(e);
    });
  });

  it("should be able to get all tags",function(done){
    TagFactory.getAllTags().then((tags)=>{
      expect(tags.length).toBe(3);
      expect(tags[1].getName()).toBe('quantity');
      done();
    }).catch(function(e){
      Utility.logError(e);
    });
  });

  it("should be able to delete tag",function(done){
    TagFactory.getTag("value").then((tag)=>{
      return TagFactory.removeTag(tag);
    })
    .then(()=>{
      return TagFactory.getAllTags();
    })
    .then((tags)=>{
      expect(tags.length).toBe(2);
      done();
    }).catch(function(e){
      Utility.logError(e);
    });
  });

  it("should be able to delete all tags",function(done){
    TagFactory.removeAllTags().then(()=>{
      return TagFactory.getAllTags();
    })
    .then((tags)=>{
      expect(tags.length).toBe(0);
      done();
    }).catch(function(e){
      Utility.logError(e);
    });
  });

  it("should be able to create tagValue for item",function(done){
    createTestAccount().then(()=>{
      return createTestItem();
    })
    .then(()=>{
      return TagFactory.createTag("quality");
    })
    .then((tag1)=>{
      return TagFactory.createTagValue(tag1.getId(),testItemId, 'rare', tag1.getName());
    })
    .then((tagValue)=>{
      expect(tagValue).toExist().toNotBe(null).toNotBe('');
      done();
    }).catch(function(e){
      Utility.logError(e);
    });
  });

  it("should be able to get tagValue for item",function(done){
      TagFactory.getTag("quality").then((tag)=>{
      return TagFactory.getTagValue(tag.getId(),testItemId);
    })
    .then((tagValue)=>{
      expect(tagValue).toExist().toNotBe(null).toNotBe('');
      done();
    }).catch(function(e){
      Utility.logError(e);
    });
  });

  it("should be able to get tagValue value",function(done){
    TagFactory.getTag("quality").then((tag)=>{
      return TagFactory.getTagValue(tag.getId(),testItemId);
    }).then((tagValue)=>{
      expect(tagValue).toExist().toNotBe(null).toNotBe('');
      expect(tagValue.getValue()).toBe('rare');
      done();
    }).catch(function(e){
      Utility.logError(e);
    });
  });

  it("should be able to get tagValue tag",function(done){
    let ltag = null;
    TagFactory.getTag("quality").then((tag)=>{
      ltag = tag;
      return TagFactory.getTagValue(tag.getId(),testItemId);
    })
    .then((tagValue)=>{
      expect(tagValue).toExist().toNotBe(null).toNotBe('');
      expect(tagValue.getTagName()).toBe(ltag.getName());
      done();
    }).catch(function(e){
      Utility.logError(e);
    });
  });

//TODO: also test getting tagValues for item without a tagValue

  it("should be able to get all tagValues for item",function(done){
    TagFactory.createTag("quantity")
    .then((tag1)=>{
      return  TagFactory.createTagValue(tag1.getId(),testItemId,'10');
    })
    .then((tagValue)=>{
      return TagFactory.createTag("weight");
    })
    .then((tag3)=>{
      return TagFactory.createTagValue(tag3.getId(),testItemId2,'50kg');
    })
    .then(()=>{
      return TagFactory.getItemTagValues(testItemId);
    })
    .then((itemTagValues)=>{
      expect(itemTagValues.length).toBe(2);
      expect(itemTagValues[1].getValue()).toBe('10');
      done();
    }).catch(function(e){
      Utility.logError(e);
    });
  });

  it("should be able to edit item tagValue",function(done){
    let ltag = null;
    TagFactory.getTag("quality").then((tag)=>{
      ltag = tag;
      return TagFactory.getTagValue(tag.getId(),testItemId);
    })
    .then((tagValue)=>{
      expect(tagValue.getValue()).toBe('rare');
      return tagValue.setValue('common');
    })
    .then(()=>{
      return TagFactory.getTagValue(ltag.getId(),testItemId);
    })
    .then((tagValue)=>{
      expect(tagValue.getValue()).toBe('common');
      done();
    }).catch(function(e){
      Utility.logError(e);
    });
  });

  it("should be able to remove tagValue from item",function(done){
    TagFactory.getItemTagValues(testItemId)
    .then((itemTagValues)=>{
      expect(itemTagValues.length).toBe(2);
      return TagFactory.getTag("quantity");
    })
    .then((tag)=>{
      return TagFactory.removeTagValue(tag.getId(), testItemId);
    })
    .then(()=>{
      return TagFactory.getItemTagValues(testItemId);
    })
    .then((itemTagValues)=>{
      expect(itemTagValues.length).toBe(1);
      expect(itemTagValues[0].getTagName()).toBe('quality');
      done();
    }).catch(function(e){
      Utility.logError(e);
    });
  });

  it("should be able to delete all tagValues on item",function(done){
    TagFactory.getTag("quantity")
    .then((tag1)=>{
      return TagFactory.createTagValue(tag1.getId(),testItemId,'10');
    })
    .then((tagValue)=>{
      return TagFactory.getItemTagValues(testItemId);
    })
    .then((itemTagValues)=>{
      expect(itemTagValues.length).toBe(2);
      return TagFactory.removeAllItemTagValues(testItemId);
    })
    .then(()=>{
      return TagFactory.getItemTagValues(testItemId);
    })
    .then((itemTagValues)=>{
      expect(itemTagValues.length).toBe(0);
      done();
    })
    .catch((e)=>{
      Utility.logError(e);
    });
  });

  it("should be able to delete all tagValues",function(done){
    TagFactory.getTag("quantity")
    .then((tag1)=>{
      return TagFactory.createTagValue(tag1.getId(),testItemId,'10');
    })
    .then(()=>{
      return TagFactory.getTag("quality");
    })
    .then((tag2)=>{
      return TagFactory.createTagValue(tag2.getId(),testItemId,'10');
    })
    .then(()=>{
      return TagFactory.getAllTagValues();
    })
    .then((itemTagValues)=>{
      expect(itemTagValues.length).toBe(3); //remember we created weight earlier
      return TagFactory.removeAllTagValues();
    })
    .then(()=>{
      return TagFactory.getAllTagValues();
    })
    .then((itemTagValues)=>{
      expect(itemTagValues.length).toBe(0);
    })
    .then(()=>{
      return destroyTestItem();
    })
    .then(()=>{
      return destroyTestAccount();
    }).catch(function(e){
      destroyTestItem().then(()=>{
        return destroyTestAccount();
      });
      Utility.logError(e);
    })
    .then(()=>{
      return UtilData.clearAllData();
    })
    .then(done)
    .catch((e)=>{
      Utility.logError(e);
    });
  });



});
