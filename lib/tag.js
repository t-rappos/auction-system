var Utility = require('./utility.js');

class Tag{

  _validate(name){
    let valid = Utility.isAlpha(name)
    && Utility.isString(name)
    && name.length <= 16;
    return valid;
  }

  constructor(id, name){
    if(this._validate(name)){
      this.id = id;
      this.name = name;
      Object.freeze(this);
    } else{
      throw(new Error("invalid Tag name"));
    }

  }
  getId(){return this.id;}
  getName(){return this.name;}
}

module.exports = {
  Tag : Tag
};
