class Tag{
  constructor(id, name){
    this.id = id;
    this.name = name;
    Object.freeze(this);
  }
  getId(){return this.id;}
  getName(){return this.name;}
}

module.exports = {
  Tag : Tag
};
