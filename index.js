"use strict";

let express = require("express");
let app = express();
let path = require('path');
let cors = require('cors');       
var whitelist = ['http://localhost:3000/', 'http://localhost:3001/',  'http://localhost:3002/'];
var corsOptions = {
  origin: function(origin, callback){
  var isWhitelisted = whitelist.indexOf(origin) !== -1;
  callback(null, isWhitelisted); 
  // callback expects two parameters: error and options 
  },
  credentials:true
}

// bootstrap
app.use(express.static(path.join(__dirname, 'www')));
app.use('/js', express.static(path.join(__dirname,  'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));

app.use( cors(corsOptions) );  

app.listen(3001, function(){
    console.log("App is running on port 3001");
});

app.get("/", function(req, res){
    res.sendfile("index.html");
});

app.get("/hosung", function(req, res){
  res.json({'id': 'hosung'});
});

app.get("/hwanhee", function(req, res){
  res.json({'id': 'hwanhee'});
});

console.log("=================> 들어왔다.");
