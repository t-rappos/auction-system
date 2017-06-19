
function TagValue(sequelizeObj, SequelizeLib, tagModel, itemModel){
  let tagValueModel = sequelizeObj.define('tagValue',{
    value: {type: SequelizeLib.STRING(100), allowNull: false}
  });
  tagModel.belongsToMany(itemModel, { through : tagValueModel});
  itemModel.belongsToMany(tagModel, {through : tagValueModel});
  return tagValueModel;
}

module.exports = {
  TagValue : TagValue
};
