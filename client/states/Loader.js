import Phaser from 'phaser';
import manifest from 'manifest.js';

export default class Loader extends Phaser.State {
  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadBar');
    [this.loaderBg, this.loaderBar].forEach((elem) => elem.anchor.setTo(0.5));

    this.load.setPreloadSprite(this.loaderBar);

    // Loads all images
    manifest.images.forEach(asset => {
      let item = require(`assets/images/${asset[1]}`);
      let name = asset[0];
      this.game.load.image(name, item);
    });

    // Loads all spritesheets
    manifest.spritesheets.forEach(asset => {
      let item = require(`assets/spritesheets/${asset[1]}`);
      let name = asset[0];
      this.game.load.spritesheet(name, item, asset[2], asset[3]);
    });

    // Loads all tilemaps
    manifest.tilemaps.forEach(asset => {
      let item = require(`assets/tilemaps/${asset[1]}`);
      let name = asset[0];
      this.game.load.tilemap(name, item, null, Phaser.Tilemap.TILED_JSON);
    });

    // Loads all tilesets
    manifest.tilesets.forEach(asset => {
      let item = require(`assets/tilemaps/${asset[1]}`);
      let name = asset[0];
      this.game.load.image(name, item);
    });

    // Loads all audio
    manifest.audio.forEach(asset => {
      let item = require(`assets/audio/${asset[1]}`);
      let name = asset[0];
      this.game.load.tilemap(name, item);
    });

    // TODO: load fonts
    // TODO: load bitmap_fonts
  }

  create() {
    this.state.start('Game');
  }
}
