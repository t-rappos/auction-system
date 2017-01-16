//There is no additional state stored in this file...
//all state is stored in severState.js, which is basically modelling an external DB.

var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var serverState = require("./serverState.js")
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('public'));

//TODO: is there any logic behind naming api paths?
app.get('/api',function(req,res){
  console.log(req.body);
  res.json([{username:'tom1'},{username:'andy'},{username:'u3'},{username:'u4'}]);
});

function logUser(user)
{
  serverState.addUser(user);
  console.log("Online users ", serverState.getNumberOfUsers());
};

function logoutUser(user)
{
  serverState.removeUser(user);
  console.log("Online users ", serverState.getNumberOfUsers());
};

app.post('/api/login',function(req,res){
  console.log(req.body);
  var loginUser = req.body.user;
  console.log('user attempting to login : ', loginUser);
  logUser(loginUser);
  res.json([{success : true}]);

});

app.post('/api/logout',function(req,res){
  console.log(req.body);
  var ll = req.body.username;
  console.log('user attempting to logout : ', ll);
  logoutUser(ll);

  res.json([{success : true}]);

});

app.listen(3000,function(){
  console.log("express server is up");
});
