import Phaser from 'phaser';
import Player from 'sprites/Player.js';

export default class RemotePlayer extends Player {
  constructor({game, x = 0, y = 0, asset}) {
    let graphic = game.make.bitmapData(32,32);
    graphic.rect(0,0,32,32,'#f47a42');
    super({game: game, x: x, y: y, asset: asset || graphic});
  }

  update() {

  }

  updatePlayer({x, y, velocity}) {
    this.x = x;
    this.y = y;
    this.body.velocity.x = velocity.x;
    this.body.velocity.y = velocity.y;
  }

}
