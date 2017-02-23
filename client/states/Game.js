import Phaser from 'phaser';
import SocketHandler from 'SocketHandler';
import Player from 'sprites/Player.js';
import RemotePlayer from 'sprites/RemotePlayer.js';

export default class Game extends Phaser.State {

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.setBoundsToWorld();
    this.players = {};
    this.game.socketHandler = new SocketHandler();
    this.game.socketHandler.on('init', this.handleInit.bind(this));
    this.game.socketHandler.on('update', this.handleUpdate.bind(this));
    this.game.socketHandler.on('newPlayer', this.handleNewPlayer.bind(this));
    this.game.socketHandler.on('removePlayer', this.handleRemovePlayer.bind(this));
    this.remoteGroup = new Phaser.Group(this.game);
  }

  update() {
    this.physics.arcade.collide(this.player, this.remoteGroup);
  }

  handleInit(payload) {
    this.playerId = payload.id;
    Object.keys(payload.players).forEach((elem) => {
      if(elem === this.playerId.toString()) {
        this.player = new Player({game: this.game,x: payload.x, y:payload.y});
        this.players[this.playerId] = this.player;
      } else {
        this.players[elem] = new RemotePlayer({
          game: this.game,x: payload.players[elem].x, y: payload.players[elem].y
        });
        this.remoteGroup.add(this.players[elem]);
      }
    });
  }

  handleUpdate(payload) {
    if(payload.id !== this.playerId)
      this.players[payload.id].updatePlayer(payload);
  }

  handleNewPlayer(payload) {
    if(payload.id !== this.playerId)
      this.players[payload.id] = new RemotePlayer({
        game: this.game,x: payload.player.x, y:payload.player.y
      });
    this.remoteGroup.add(this.players[payload.id]);
  }

  handleRemovePlayer(payload) {
    this.players[payload.id].destroy();
    delete this.players[payload.id];
  }

  // handleSocket(message) {
  //   let type = message.type;
  //   let payload = message.payload;
  //   switch(type) {
  //     case 'init':
  //       this.playerId = payload.id;
  //       Object.keys(payload.players).forEach((elem) => {
  //         if(elem === this.playerId.toString()) {
  //           this.player = new Player({game: this.game,x: payload.x, y:payload.y});
  //           this.players[this.playerId] = this.player;
  //         } else {
  //           this.players[elem] = new RemotePlayer({
  //             game: this.game,x: payload.players[elem].x, y: payload.players[elem].y
  //           });
  //           this.remoteGroup.add(this.players[elem]);
  //         }
  //       });
  //       break;

  //     case 'update':
  //       if(payload.id !== this.playerId)
  //         this.players[payload.id].updatePlayer(payload);
  //       break;

  //     case 'newPlayer':
  //       if(payload.id !== this.playerId)
  //         this.players[payload.id] = new RemotePlayer({
  //           game: this.game,x: payload.player.x, y:payload.player.y
  //         });
  //       this.remoteGroup.add(this.players[payload.id]);
  //       break;

  //     case 'removePlayer':
  //       this.players[payload.id].destroy();
  //       delete this.players[payload.id];
  //       break;

  //     default:
  //       console.error(`NO HANDLER FOR ${message.type} type`);
  //   }

  // }
}
