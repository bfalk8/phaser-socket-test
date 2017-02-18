import Phaser from 'phaser';
import SocketHandler from 'SocketHandler';

export default class Game extends Phaser.State {
  preload() {
    this.socketHandler = new SocketHandler();
  }

  create() {
    this.testImage = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'test');
    this.testImage.anchor.setTo(0.5);

  }
}
