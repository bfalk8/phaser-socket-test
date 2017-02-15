import Phaser from 'phaser';
import manifest from 'manifest.js';

export default class Loader extends Phaser.State {
  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadBar');
    [this.loaderBg, this.loaderBar].forEach((elem) => elem.anchor.setTo(0.5));

    this.load.setPreloadSprite(this.loaderBar);
    // load everything from manifest
    Object.keys(manifest).forEach(assetType => manifest[assetType].forEach(asset => {
        let item = require(`assets/${assetType}/${asset[1]}`);
        let name = asset[0];
        this.game.load.image(name, item);
      })
    );
  }

  create() {
    this.state.start('Game');
  }
}
