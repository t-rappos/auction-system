let expect = require('expect');
let TagFactory = require('../lib/tagFactory.js');

let itemId = 0;

describe('TagFactory',function(){
  it("should exist",function(done){
    expect(TagFactory).toExist();
    done();
  });

  it("should be able to create tag",function(done){
    Promise.all([TagFactory.createTag("value"),
                TagFactory.createTag("quantity"),
                TagFactory.createTag("quality"))
    .then((results)=>{
      expect(results[0]).toExist().toNotBe(null).toNotBe('');
      done();
    }).catch(function(error){
      throw(error);
    });
  });

  it("should be able to get tag",function(done){
    TagFactory.getTag("value").then((result)=>{
      expect(result).toExist().toNotBe(null).toNotBe('');
      done();
    });
  });

  it("should be able to get tag name",function(done){
    TagFactory.getTag("value").then((result)=>{
      expect(result.getName()).toBe("value");
      done();
    });
  });

  it("should be able to get tag id",function(done){
      TagFactory.getTag("value").then((result)=>{
        expect(result.getId()).toNotBe(null).toNotBe('');
        done();
    });
  });

  it("should be able to get all tags",function(done){
    TagFactory.getTags().then((tags)=>{
      expect(tags.length).toBe(3);
      expect(tags[1].getName()).toBe('quantity');
      done();
    });
  });

  it("should be able to delete tag",function(done){
    TagFactory.getTag("value").then((tag)=>{
      return TagFactory.deleteTag(tag);
    })
    .then(()=>{
      return TagFactory.getTags();
    })
    .then((tags)=>{
      expect(tags.length).toBe(2);
      done();
    });
  });

  it("should be able to delete all tags",function(done){
    TagFactory.deleteAllTags().then(()=>{
      return TagFactory.getTags();
    })
    .then((tags)=>{
      expect(tags.length).toBe(0);
      done();
    });
  });

  it("should be able to create tagValue for item",function(done){
    TagFactory.createTag("quality").then((tag1)=>{
      return TagFactory.createTagValue(tag1.getId(),itemId, 'rare');
    })
    .then((tagValue)=>{
      expect(tagValue).toExist().toNotBe(null).toNotBe('');
      done();
    });
  });

  it("should be able to get tagValue for item",function(done){
    let tag = TagFactory.getTag("quality").then((tag)=>{
      return TagFactory.getTagValue(tag.getId(),itemId);
    })
    .then((tagValue)=>{
      expect(tagValue).toExist().toNotBe(null).toNotBe('');
      done();
    });
  });

  it("should be able to get tagValue value",function(done){
    TagFactory.getTag("quality").then((tag)=>{
      return TagFactory.getTagValue(tag.getId(),itemId);
    }).then((tagValue)=>{
      expect(tagValue).toExist().toNotBe(null).toNotBe('');
      expect(tagValue.getValue()).toBe('rare');
      done();
    });
  });

  it("should be able to get tagValue tag",function(done){
    TagFactory.getTag("quality").then((tag)=>{
      return TagFactory.getTagValue(tag.getId(),itemId);
    })
    .then((tagValue=>{
      expect(tagValue).toExist().toNotBe(null).toNotBe('');
      expect(tagValue.getTag().getName().toBe(tag.getName());
      done();
    });
  });

  it("should be able to get all tagValues for item",function(done){
    TagFactory.createTag("quantity").then((tag1)=>{
      return  TagFactory.createTagValue(tag1.getId(),itemId,'10');
    })
    .then((tagValue)=>{
      return TagFactory.getTag("weight");
    })
    .then((tag3)=>{
      return TagFactory.createTagValue(tag3.getId(),itemId+1,'50kg');
    })
    .then((tagValue3)=>{
      return TagFactory.getItemTagValues(itemId);
    })
    .then((itemTagValues=>{
      expect(itemTagValues.length).toBe(2);
      expect(itemTagValues[1].getValue()).toBe('10');
      done();
    });
  });

  it("should be able to edit item tagValue",function(done){
    TagFactory.getTag("quality").then((tag)=>{
      return TagFactory.getTagValue(tag.getId(),itemId);
    })
    .then((tagValue)=>{
      expect(tagValue.getValue()).toBe('rare');
      return tagValue.setValue('common');
    })
    .then(()=>{
      return TagFactory.getTagValue(tag.getId(),itemId);
    })
    .then((tagValue)=>{
      expect(tagValue.getValue()).toBe('common');
      done();
    });
  });

  it("should be able to remove tagValue from item",function(done){
    TagFactory.getItemTagValues(itemId)
    .then((itemTagValues)=>{
      expect(itemTagValues.length).toBe(2);
      return TagFactory.getTag("quantity");
    })
    .then((tag)=>{
      return TagFactory.removeTagValue(tag.getId(), itemId);
    })
    .then(()=>{
      return TagFactory.getItemTagValues(itemId);
    })
    .then((itemTagValues)=>{
      expect(itemTagValues.length).toBe(1);
      expect(itemTagValues[0].getTag().getName()).toBe('quality');
      done();
    });
  });

  it("should be able to delete all tagValues on item",function(done){
    TagFactory.getTag("quantity").then((tag1)=>{
      return TagFactory.createTagValue(tag1.getId(),itemId,'10');
    })
    .then((tagValue)=>{
      return TagFactory.getItemTagValues(itemId);
    })
    .then((itemTagValues)=>{
      expect(itemTagValues.length).toBe(2);
      return TagFactory.removeAllItemTagsValues(itemId);
    })
    .then(()=>{
      return TagFactory.getItemTagValues(itemId);
    })
    .then((itemTagValues)=>{
      expect(itemTagValues.length).toBe(0);
      done();
    });
  });

  it("should be able to delete all tagValues",function(done){
    TagFactory.getTag("quantity").then((tag1)=>{
      return TagFactory.createTagValue(tag1.getId(),itemId,'10');
    })
    .then(()=>{
      return TagFactory.getTag("quality");
    })
    .then((tag2)=>{
      return TagFactory.createTagValue(tag2.getId(),itemId,'10');
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
      done();
    });
  });

});
