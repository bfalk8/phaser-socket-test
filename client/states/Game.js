import Phaser from 'phaser';
import SocketHandler from 'SocketHandler';
import Player from 'sprites/Player.js';
import RemotePlayer from 'sprites/RemotePlayer.js';

export default class Game extends Phaser.State {

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.setBoundsToWorld();
    this.players = {};
    this.game.socketHandler = new SocketHandler(this.handleSocket.bind(this));
  }

  handleSocket(message) {
    let event = message.event;
    let payload = message.payload;
    switch(event) {
      case 'init':
        this.playerId = payload.id;
        Object.keys(payload.players).forEach((elem) => {
          if(elem === this.playerId.toString()) {
            this.player = new Player({game: this.game,x: payload.x, y:payload.y});
            this.players[this.playerId] = this.player;
          } else {
            this.players[elem] = new RemotePlayer({
              game: this.game,x: payload.players[elem].x, y: payload.players[elem].y
            });
          }
        });
        break;

      case 'update':
        if(payload.id !== this.playerId)
          this.players[payload.id].updatePlayer(payload);
        break;

      case 'newPlayer':
        if(payload.id !== this.playerId)
          this.players[payload.id] = new RemotePlayer({
            game: this.game,x: payload.player.x, y:payload.player.y
          });
        break;

      default:
        console.error(`NO HANDLER FOR ${message.event} event`);
    }

  }
}
