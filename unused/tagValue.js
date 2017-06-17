let Utility = require('./utility.js');

class TagValue{

  _validate(tagId, itemId, value, tag){
    let tagValid = Utility.isAlpha(tag)
    && Utility.isString(tag)
    && tag.length <= 16;
    let valueValid = this._validateValue(value);
    let idsValid = Utility.isNumeric(tagId) && Utility.isNumeric(itemId);
    if (!tagValid){throw new Error("tag invalid, " + tag);}
    if (!valueValid){throw new Error("value invalid, " + value);}
    if (!idsValid){throw new Error("ids invalid, " + tagId + " : " + itemId);}
    return tagValid && valueValid && idsValid;
  }

  _validateValue(value){
    let valueValid = (Utility.isAlphaNumeric(value) || Utility.isNumeric(value));
    if(Utility.isString(value)){
      if (value.length > 16){valueValid = false;}
    }
    return valueValid;
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
    if(this._validateValue(value)){
      return this._changeValueFn(value);
    } else {
      throw new Error("invalid value");
    }
  }
}

module.exports = {
  TagValue : TagValue
};
