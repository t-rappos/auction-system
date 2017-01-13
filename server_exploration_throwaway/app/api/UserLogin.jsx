var axios = require('axios');

module.exports = {

  getUsers: function (){
    return axios.get('/api')
    .then(function(res){
      let users = [];
      res.data.forEach(function(user){
        users.push(user.username);
      });
      return users;
    },
    function(res){
      //throw new Error(res.data.message);
    });
  },

  sendLoginChoice: function(data){
    return axios.post('/api/login',data)
    .then(function(response){
      console.log('sendLoginChoice:', response);
      console.log('sendLoginChoice - post success');
      return response;
    })
    .catch(function(error){
      console.log('sendLoginChoice - post fail');
      console.log(error);
      throw(error);
    });
  }
}
