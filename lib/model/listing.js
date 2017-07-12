
function Listing(sequelizeObj, SequelizeLib, accountModel, itemModel){
  const listingModel = sequelizeObj.define('listing', {
    id:{type: SequelizeLib.INTEGER, autoIncrement : true, primaryKey: true},
    type:{  type:   SequelizeLib.ENUM,
            values: ['bid', 'buyout']},
        
    starting_price: {type: SequelizeLib.REAL, allowNull : false},
    expiry_date: {type: SequelizeLib.DATE, allowNull: false},
    creation_date: {type: SequelizeLib.DATE, allowNull: false},
    sold: {type:SequelizeLib.BOOLEAN, defaultValue : false},
    expiry_processed : {type:SequelizeLib.BOOLEAN, defaultValue : false}
  });
  listingModel.belongsTo(accountModel, {foreignKey:'sellerId', foreignKeyConstraint:true});
  listingModel.belongsTo(itemModel, {foreignKey:'itemId', foreignKeyConstraint:true});
  return listingModel;
}

module.exports = {
  Listing : Listing
};
