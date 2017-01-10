var express = require("express");
var app = express();

app.use(express.static('public'));

app.get('/api',function(req,res){
  res.json([{username:'tom1'},{username:'andy'},{username:'u3'},{username:'u4'}]);
});

app.listen(3000,function(){
  console.log("express server is up");
});
