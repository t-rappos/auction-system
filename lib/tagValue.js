class TagValue{

  _validate(id, tagId, itemId, value){
    return false;
  }

  _getTag(){return null;}

  constructor(id, tagId, itemId, value){
    if(_validate(id, tagId, itemId, value)){
      this.id = id;
      this.tagId = tagId;
      this.itemId = itemId;
      this.value = value;
      Object.freeze(this);
    } else{
      throw(new Error("invalid TagValue params"));
    }

  }
  getId(){return this.id;}
  getTagId(){return this.tagId;}
  getTag(){return null;}
  getItemId(){return this.itemId;}
  getValue(){return this.value;}
  setValue(value){}
}

module.exports = {
  TagValue : TagValue
};
