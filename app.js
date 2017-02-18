var path = require('path');
var http = require('http');
var express = require('express');
const WebSocket = require('ws');

var app = express();
var server = http.createServer(app);

var ROOT_DIR = 'public';
var port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, ROOT_DIR)));

const wss = new WebSocket.Server({server});

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
  ws.on('message', (message) => {
    console.log(message);
    wss.clients.forEach((client) => client.send(message));
  });
});

server.listen(port, function() {
  console.log(`listening on port ${port}`);
});
