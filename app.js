var path = require('path');
var http = require('http');
var express = require('express');
const WebSocket = require('uws');

var app = express();
var server = http.createServer(app);

var ROOT_DIR = 'public';
var port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, ROOT_DIR)));

const wss = new WebSocket.Server({server});

var Game = require('./server/Game.js');
let game = new Game();
let socketCount = 0;

wss.on('connection', (ws) => {
  ws.id = socketCount++;
  console.log(`Client ${ws.id} connected`);

  game.addPlayer(ws.id);

  ws.send(JSON.stringify({event: 'init', payload: {id: ws.id, players: game.players}}));
  wss.clients.forEach((client) => client.send(JSON.stringify({
    event: 'newPlayer', payload: {id: ws.id, player: game.players[ws.id]}
  })));

  ws.on('close', () => {
    console.log(`Client ${ws.id} disconnected`);
    game.removePlayer(ws.id);
  });

  ws.on('message', (message) => {
    let msg = JSON.parse(message);

    switch(msg.event) {
      case 'update':
        game.updatePlayer(ws.id, msg.payload);
        let temp = game.players[ws.id];
        temp.id = ws.id;
        let updateMsg = JSON.stringify({event: 'update', payload: temp});
        wss.clients.forEach((client) => client.send(updateMsg));
        break;
    }
  });
});

server.listen(port, function() {
  console.log(`listening on port ${port}`);
});
