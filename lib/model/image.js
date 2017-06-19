
function Image(sequelizeObj, SequelizeLib){
  return sequelizeObj.define('image', {
    id:{type: SequelizeLib.INTEGER, autoIncrement : true, primaryKey: true},
    url:{type: SequelizeLib.STRING(500), allowNull: false},
    name:{type: SequelizeLib.STRING(30), allowNull: false}
  });
}

module.exports = {
  Image : Image
};
