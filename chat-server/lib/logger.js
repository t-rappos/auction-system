let DEBUG_VERBOSE = true;

function log(){
    if(console && DEBUG_VERBOSE){
        console.log.apply(console, arguments);
    }
}

module.exports = {
  log: log
};
