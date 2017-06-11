let Utility = require('./utility.js');

class TagValue{

  _validate(tagId, itemId, value, tag){
    Utility.logWarning("TODO: tagValue _validate");
    //ids are numbers
    //value is valid?
    return true;
  }

  _validateValue(value){
    Utility.logWarning("TODO: tagValue _validateValue");
    return true;
  }

  constructor(tagId, itemId, value, tagName){
    if(this._validate(tagId, itemId, value, tagName)){
      this.tagId = tagId;
      this.itemId = itemId;
      this.value = value;
      this.tagName = tagName;
      this._changeValueFn = ()=>{Utility.logWarning("tag value change value not implemented");};
    } else{
      throw(new Error("invalid TagValue params"));
    }
  }
  shallowCopy(otherTagValue){
    if(otherTagValue){
      this.tagId = otherTagValue.tagId;
      this.itemId = otherTagValue.itemId;
      this.value = otherTagValue.value;
      this.tagName = otherTagValue.tagName;
    } else {
      this.tagId = null;
      this.itemId = null;
      this.value = null;
      this.tagName = null;
    }
  }
  destroy(){this.shallowCopy(null);}
  getTagId(){return this.tagId;}
  getTagName(){return this.tagName;}
  getItemId(){return this.itemId;}
  getValue(){return this.value;}

  setValue(value){
    return new Promise((resolve, reject)=>{
      let valid = this._validateValue(value);
      if(valid){
        resolve(this._changeValueFn(value));
      } else {
        reject('invalid value');
      }
    });
  }
}

module.exports = {
  TagValue : TagValue
};
