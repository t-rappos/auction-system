var expect = require('expect');
let Item = require('../lib/item.js');

let item_image = 'https://members.dd-on.jp/common/img/item/item/bb8a558c6b1f1a1cf12e08c49dd0a17d.png';

describe('Item',function(){

  it('should exist',function(done){
    expect(Item).toExist();
    done();
  });

  it('should be able to get name',function(done){
    let item = new Item.Item(0,'bronze sword', 'a bit dull', item_image);
    expect(item.getName()).toBe('bronze sword');
    done();
  });

  it('should be able to get description',function(done){
    let item = new Item.Item(0,'bronze sword', 'a bit dull', item_image);
    expect(item.getDescription()).toBe('a bit dull');
    done();
  });

  it('should be able to get image',function(done){
    let item = new Item.Item(0,'bronze sword', 'a bit dull', item_image);
    expect(item.getImageUrl()).toBe(item_image);
    done();
  });

  it('should be able to validate',function(done){
    //null name -> fail
    let item = new Item.Item(0,'', 'a bit dull', item_image);
    expect(function(){item.validate();}).toThrow(/name/);

    //null desc -> pass
    item = new Item.Item(0,'bronzeSword', '', item_image);
    expect(item.validate()).toBe(true);

    //null image -> pass
    item = new Item.Item(0,'bronzeSword', 'a bit dull', '');
    expect(item.validate()).toBe(true);

    //symbols name -> fail
    item = new Item.Item(0,'BronzeSw()rd', 'a bit dull', item_image);
    expect(function(){item.validate();}).toThrow(/name/);

    //symbols desc -> pass
    item = new Item.Item(0,'bronze sword', 'a bit dull!', item_image);
    expect(item.validate()).toBe(true);

    //length name in (3-30 chars) -> pass else fail
    item = new Item.Item(0,'QQ', 'a bit dull', item_image);
    expect(function(){item.validate();}).toThrow(/name/);

    item = new Item.Item(0,'This is an item that is sharp and bronze maybe a sword', 'a bit dull', item_image);
    expect(function(){item.validate();}).toThrow(/name/);

    //length desc < 150 chars -> pass else fail
    item = new Item.Item(0,'bronze sword', 'This is an item that is sharp and bronze maybe a sword', item_image); //pass
    expect(item.validate()).toBe(true);

    let desc = '';
    for(let i = 0; i < 15; i++){
      desc += 'description on loop';
    }
    item = new Item.Item(0,'bronze sword', desc, item_image); //fail
    expect(function(){item.validate();}).toThrow(/desc/);

    let url = item_image;
    //length url < 500 chars -> pass else fail
    for(let i = 0; i < 50; i++){
      url += 'item url on loop';
    }
    item = new Item.Item(0,'bronze sword', 'a bit dull', url);
    expect(function(){item.validate();}).toThrow(/url/);

    done();
  });

  it('should be immutable', function(done){

    let item = new Item.Item(0,'bronze sword', 'a bit dull', item_image);
    expect(function(){item.name = 'new name';}).toThrow(/read only/);
    done();
  });

});
