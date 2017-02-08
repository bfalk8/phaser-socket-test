import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';

class Game extends Phaser.Game {
  constructor() {
    const width = 800;
    const height = 600;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState, false);

    this.state.start('Boot');
  }
}

window.game = new Game();
