import Phaser from 'phaser';
import SocketHandler from 'SocketHandler';
import Player from 'sprites/Player.js';
import RemotePlayer from 'sprites/RemotePlayer.js';
import 'joystick';

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

    this.initMap();


    this.game.input.addPointer();
    this.game.controls = {};
    this.game.controls.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);
    this.game.controls.joystick = this.game.controls.gamepad.addJoystick(100, this.camera.height - 100, 1.2, 'gamepad');
    this.game.controls.btn = this.game.controls.gamepad.addButton(this.camera.width - 100, this.camera.height - 100, 1.0, 'gamepad');
  }

  update() {
    this.physics.arcade.collide(this.player, this.remoteGroup);
    this.physics.arcade.collide(this.player, this.collisionLayer);
  }

  handleInit(payload) {
    this.playerId = payload.id;
    Object.keys(payload.players).forEach((elem) => {
      if(elem === this.playerId.toString()) {
        // this.player = new Player({game: this.game,x: payload.x, y:payload.y});
        this.player = new Player({game: this.game,x: this.map.objects.info.find(o => o.type === 'spawn').x, y: this.map.objects.info.find(o => o.type === 'spawn').y});
        this.players[this.playerId] = this.player;
        this.player.bringToTop();
        this.game.camera.follow(this.player);
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

  initMap() {
    this.map = this.game.add.tilemap('houseMap');
    this.map.setCollisionByExclusion([], true, 'collision');
    this.map.addTilesetImage('collision', 'collisionSet');
    this.map.addTilesetImage('tilesetHouse', 'houseSet');
    this.collisionLayer = this.map.createLayer('collision');
    this.collisionLayer.resizeWorld();
    this.floorLayer = this.map.createLayer('bg');
    this.wallLayer = this.map.createLayer('fg');
    this.collisionLayer.visible = false;

    this.floorLayer.sendToBack();
  }

}
