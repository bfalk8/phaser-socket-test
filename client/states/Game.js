import Phaser from 'phaser';

export default class Game extends Phaser.State {
  create() {
    this.testImage = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'test');
    this.testImage.anchor.setTo(0.5);
  }
}
