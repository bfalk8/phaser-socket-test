var path = require('path');
var http = require('http');
var express = require('express');

var app = express();
var server = http.createServer(app);

var ROOT_DIR = 'public';
var port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, ROOT_DIR)));

server.listen(port, function() {
  console.log(`listening on port ${port}`);
});
