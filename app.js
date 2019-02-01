const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.redirect("index.html");
});

app.listen(8000, function(){
  console.log("Listening on port 8000");
});
