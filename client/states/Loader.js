import ManifestLoader from 'phaser-manifest-loader/src/ManifestLoader';
import Phaser from 'phaser';
import manifest from '../manifest.js';

export default class Loader extends Phaser.State {
  create() {
    this.manifestLoader = this.game.plugins.add(ManifestLoader)
    Promise.all([
      this.manifestLoader.loadManifest(manifest),
      this.startLoadingAnimation()
    ]).then(() => {
      this.game.state.start('Game')
    });
  }

  startLoadingAnimation () {
    return new Promise((resolve, reject) => {
      const spinner = this.add.image(this.world.centerX, this.world.centerY, 'loader')
      spinner.anchor.set(0.5)
      this.add.tween(spinner).to({angle: 360}, 1000, 'Linear', true, 0, -1, false)
      setTimeout(() => {
        resolve()
      }, 2000)
    });
  }
}
