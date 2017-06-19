

function Tag(sequelizeObj, SequelizeLib){
  let tagModel = sequelizeObj.define('tag',{
    id: { type: SequelizeLib.INTEGER, autoIncrement : true, primaryKey: true},
    name: {type: SequelizeLib.STRING, allowNull: false, unique:true}
  });
  return tagModel;
}

module.exports = {
  Tag : Tag
};
