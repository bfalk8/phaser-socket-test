var Player = require('./Player.js');

function Game() {
  this.players = {};
}

Game.prototype.addPlayer = function(playerId) {
  this.players[playerId] = new Player();
}

Game.prototype.removePlayer = function(playerId) {
  delete this.players[playerId];
}

Game.prototype.updatePlayer = function(playerId, data) {
  this.players[playerId].update(data);
};

module.exports = Game;
