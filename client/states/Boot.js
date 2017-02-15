import Phaser from 'phaser';
import loaderImage from 'assets/images/loader-bar.png';

export default class Boot extends Phaser.State {
  init() {
    this.game.stage.backgroundColor = '#2B3A42';
    console.log(this.state.states);
  }

  preload() {
    this.game.load.image('loader', loaderImage);
  }

  create() {
    this.game.state.start('Loader');
  }
}
