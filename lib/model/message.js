
function Message(sequelizeObj, SequelizeLib, accountModel){
  const messageModel = sequelizeObj.define('message', {
    id:{type: SequelizeLib.INTEGER, autoIncrement : true, primaryKey: true},
    content : {type: SequelizeLib.STRING(500)},
    title : {type: SequelizeLib.STRING(100)},
    read : {type: SequelizeLib.BOOLEAN, defaultValue : false},
    time_created : {type: SequelizeLib.DATE, allowNull: false}
  });
    messageModel.belongsTo(accountModel, {foreignKey:'senderId', foreignKeyConstraint:true});
    messageModel.belongsTo(accountModel, {foreignKey:'recipientId', foreignKeyConstraint:true});
  //accountModel.hasMany(messageModel, {as:'sender'});
  //accountModel.hasMany(messageModel, {as:'recipient'});
  return messageModel;
}

module.exports = {
  Message : Message
};
