let expect = require('expect');
let TagFactory = require('../lib/tagFactory.js');

let itemId = 0;

describe('TagFactory',function(){
  it("should exist",function(done){
    expect(TagFactory).toExist();
    done();
  });

  it("should be able to create tag",function(done){
    let tag1 = TagFactory.createTag("value");
    let tag2 = TagFactory.createTag("quantity");
    let tag3 = TagFactory.createTag("quality");
    expect(tag1).toExist().toNotBe(null).toNotBe('');
    done();
  });

  it("should be able to get tag",function(done){
    let tag1 = TagFactory.getTag("value");
    expect(tag1).toExist().toNotBe(null).toNotBe('');
    done();
  });

  it("should be able to get tag name",function(done){
    let tag1 = TagFactory.getTag("value");
    expect(tag1.getName()).toBe("value");
    done();
  });

  it("should be able to get tag id",function(done){
    let tag1 = TagFactory.getTag("value");
    expect(tag1.getId()).toNotBe(null).toNotBe('');
    done();
  });

  it("should be able to get all tags",function(done){
    let tags = TagFactory.getTags();
    expect(tags.length).toBe(3);
    expect(tags[1].getName()).toBe('quantity');
    done();
  });

  it("should be able to delete tag",function(done){
    let tag1 = TagFactory.getTag("value");
    TagFactory.deleteTag(tag1);
    let tags = TagFactory.getTags();
    expect(tags.length).toBe(2);
    done();
  });

  it("should be able to delete all tags",function(done){
    TagFactory.deleteAllTags();
    let tags = TagFactory.getTags();
    expect(tags.length).toBe(0);
    done();
  });

  it("should be able to create tagValue for item",function(done){
    let tag1 = TagFactory.createTag("quality");
    let tagValue = TagFactory.createTagValue(tag1.getId(),itemId, 'rare');
    expect(tagValue).toExist().toNotBe(null).toNotBe('');
    done();
  });

  it("should be able to get tagValue for item",function(done){
    let tag = TagFactory.getTag("quality");
    let tagValue = TagFactory.getTagValue(tag.getId(),itemId);
    expect(tagValue).toExist().toNotBe(null).toNotBe('');
    done();
  });

  it("should be able to get tagValue value",function(done){
    let tag = TagFactory.getTag("quality");
    let tagValue = TagFactory.getTagValue(tag.getId(),itemId);
    expect(tagValue).toExist().toNotBe(null).toNotBe('');
    expect(tagValue.getValue()).toBe('rare');
    done();
  });

  it("should be able to get tagValue tag",function(done){
    let tag = TagFactory.getTag("quality");
    let tagValue = TagFactory.getTagValue(tag.getId(),itemId);
    expect(tagValue).toExist().toNotBe(null).toNotBe('');
    expect(tagValue.getTag().getName().toBe(tag.getName());
    done();
  });

  it("should be able to get all tagValues for item",function(done){
    let tag1 = TagFactory.createTag("quantity");
    let tagValue = TagFactory.createTagValue(tag1.getId(),itemId,'10');
    let tag3 = TagFactory.getTag("weight");
    let tagValue3 = TagFactory.createTagValue(tag3.getId(),itemId+1,'50kg');
    let itemTagValues = TagFactory.getItemTagValues(itemId);
    expect(itemTagValues.length).toBe(2);
    expect(itemTagValues[1].getValue()).toBe('10');
    done();
  });

  it("should be able to edit item tagValue",function(done){
    let tag = TagFactory.getTag("quality");
    let tagValue = TagFactory.getTagValue(tag.getId(),itemId);
    expect(tagValue.getValue()).toBe('rare');
    tagValue.setValue('common');
    tagValue = TagFactory.getTagValue(tag.getId(),itemId);
    expect(tagValue.getValue()).toBe('common');
    done();
  });

  it("should be able to remove tagValue from item",function(done){
    let itemTagValues = TagFactory.getItemTagValues(itemId);
    let tag = TagFactory.getTag("quantity");
    expect(itemTagValues.length).toBe(2);
    TagFactory.removeTagValue(tag.getId(), itemId);
    itemTagValues = TagFactory.getItemTagValues(itemId);
    expect(itemTagValues.length).toBe(1);
    expect(itemTagValues[0].getTag().getName()).toBe('quality');
    done();
  });

  it("should be able to delete all tagValues on item",function(done){
    let tag1 = TagFactory.getTag("quantity");
    let tagValue = TagFactory.createTagValue(tag1.getId(),itemId,'10');
    let itemTagValues = TagFactory.getItemTagValues(itemId);
    expect(itemTagValues.length).toBe(2);
    TagFactory.removeAllItemTagsValues(itemId);
    itemTagValues = TagFactory.getItemTagValues(itemId);
    expect(itemTagValues.length).toBe(0);
    done();
  });

  it("should be able to delete all tagValues",function(done){
    let tag1 = TagFactory.getTag("quantity");
    let tagValue = TagFactory.createTagValue(tag1.getId(),itemId,'10');
    let tag2 = TagFactory.getTag("quality");
    let tagValue2 = TagFactory.createTagValue(tag2.getId(),itemId,'10');
    let tagValues = TagFactory.getAllTagValues();
    expect(itemTagValues.length).toBe(3); //remember we created weight earlier
    TagFactory.removeAllTagValues();
    itemTagValues = TagFactory.getAllTagValues();
    expect(itemTagValues.length).toBe(0);
    done();
  });

});
