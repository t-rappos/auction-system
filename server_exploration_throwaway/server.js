var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('public'));

//TODO: is there any logic behind naming api paths?
app.get('/api',function(req,res){
  res.json([{username:'tom1'},{username:'andy'},{username:'u3'},{username:'u4'}]);
});

app.post('/api/login',function(req,res){

  var loginUser = req.body.user;
  console.log('user attempting to login : ', loginUser);

  res.json([{success : true}]);

});

app.listen(3000,function(){
  console.log("express server is up");
});
