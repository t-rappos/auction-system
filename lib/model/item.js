
function Item(sequelizeObj, SequelizeLib, accountModel, imageModel){
  const itemModel = sequelizeObj.define('item', {
    id:{type: SequelizeLib.INTEGER, autoIncrement : true, primaryKey: true},
    name:{type: SequelizeLib.STRING(30), allowNull: false},
    description:{type: SequelizeLib.STRING(150)},
    creation_date:{type: SequelizeLib.DATE, allowNull: false},
  });
  accountModel.hasMany(itemModel);
  imageModel.hasOne(itemModel);
  return itemModel;
}

module.exports = {
  Item : Item
};
