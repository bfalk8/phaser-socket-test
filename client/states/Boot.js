import Phaser from 'phaser';
import loaderBg from 'assets/images/loader-bg.png';
import loaderBar from 'assets/images/loader-bar.png';

export default class Boot extends Phaser.State {
  init() {
    this.game.stage.backgroundColor = '#2B3A42';
  }

  preload() {
    this.game.load.image('loadBg', loaderBg);
    this.game.load.image('loadBar', loaderBar);
  }

  create() {
    this.game.state.start('Loader');
  }
}
