class Tag{

  _validate(name){
    return false;
  }

  constructor(id, name){
    if(_validate(name)){
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
