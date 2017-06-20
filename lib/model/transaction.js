
function Transaction(sequelizeObj, SequelizeLib, accountModel, listingModel){
  const transactionModel = sequelizeObj.define('transaction', {
    id:{type: SequelizeLib.INTEGER, autoIncrement : true, primaryKey: true},
    amount:{type: SequelizeLib.REAL, allowNull : false },
    creation_date:{type: SequelizeLib.DATE, allowNull: false},
  });
  transactionModel.belongsTo(accountModel, {foreignKey:'bidderId', foreignKeyConstraint:true});
  transactionModel.belongsTo(listingModel, {foreignKey:'listingId', foreignKeyConstraint:true});
  return transactionModel;
}

module.exports = {
  Transaction : Transaction
};
