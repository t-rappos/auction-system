
let refreshItemsId = 0;

function refreshItems(){
  return {
    type:'REFRESH_ITEMS', id: refreshItemsId++
  };
}

let refreshMessagesId = 0;

function refreshMessages(){
  return {
    type:'REFRESH_MESSAGES', id: refreshMessagesId++
  };
}

module.exports = {
  refreshItems : refreshItems,
  refreshMessages : refreshMessages
};