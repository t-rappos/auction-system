var axios = require('axios');

module.exports = {

  getUsers: function (){
    return axios.get('/api').then(function(res){
      let users = [];
      res.data.forEach(function(user){
        users.push(user.username);
      });
      return users;
    }, function(res){
      //throw new Error(res.data.message);
    });
  }
}
