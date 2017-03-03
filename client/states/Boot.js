import Phaser from 'phaser';
import loaderBg from 'assets/images/loader-bg.png';
import loaderBar from 'assets/images/loader-bar.png';

export default class Boot extends Phaser.State {
  init() {
    this.game.stage.backgroundColor = '#2B3A42';
    let scale = Math.min(window.innerWidth/this.game.width, window.innerHeight/this.game.height);
    this.game.scale.setUserScale(scale, scale);
    // this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
  }

  preload() {
    this.game.load.image('loadBg', loaderBg);
    this.game.load.image('loadBar', loaderBar);
  }

  create() {
    this.game.state.start('Loader');
  }
}
