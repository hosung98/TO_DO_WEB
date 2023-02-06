const http = require('http');
const express = require('express');
const ejs = require('ejs');

const app = express();
const server = http.createServer(app);

const hostname = '127.0.0.1';
const port = 5000;


//app.set('view engine', 'html');
//app.set('views', './views/login');

app.get('/', (req, res) => {
  res.render('/views/login/index.html');
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


