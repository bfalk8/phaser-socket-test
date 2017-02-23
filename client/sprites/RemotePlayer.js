import Phaser from 'phaser';

export default class RemotePlayer extends Phaser.Sprite {
  constructor({game, x = 0, y = 0, asset}) {
    let graphic = game.make.bitmapData(75,175);
    graphic.rect(0,0,75,175,'#f47a42');
    super(game, x, y, graphic);
    this.anchor.setTo(0.5);
    game.add.existing(this);
    game.physics.arcade.enable(this);
    this.body.gravity.y = 0;
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
