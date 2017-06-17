

/*// Go on reading for further information about primary keys
 identifier: { type: Sequelize.STRING, primaryKey: true},

 // autoIncrement can be used to create auto_incrementing integer columns
 incrementMe: { type: Sequelize.INTEGER, autoIncrement: true },
*/


function Tag(sequelizeObj, SequelizeLib){
  return sequelizeObj.define('tag',{
    id: { type: SequelizeLib.INTEGER, autoIncrement : true, primaryKey: true},
    name: {type: SequelizeLib.STRING, allowNull: false}
  });
}

module.exports = {
  Tag : Tag
};

//class Tag{
//
//  _validate(name){
//    let valid = Utility.isAlpha(name)
//    && Utility.isString(name)
//    && name.length <= 16;
//    return valid;
//  }
//
//  constructor(id, name){
//    if(this._validate(name)){
//      this.id = id;
//      this.name = name;
//      Object.freeze(this);
//    } else{
//      throw(new Error("invalid Tag name"));
//    }
//
//  }
//  getId(){return this.id;}
//  getName(){return this.name;}
//}
//
//module.exports = {
//  Tag : Tag
//};
