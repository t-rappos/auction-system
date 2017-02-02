var db = require('./serverPGDB.js'); //TODO: abstract this out?
//var debug = require('./logger.js');

function createDBTables(){

}

//calls the argument callback on success
function initialise(onSuccess){
  db.connect(function(success){
    if (success){
      createDBTables();
      onSuccess();
    }
    else  {
      throw new Error('serverDB: initialise : Couldnt connect to database');
    }
  });
}


module.exports =
{
  initialise:initialise
};
