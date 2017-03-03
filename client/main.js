import 'pixi';
import 'p2';
import Phaser from 'phaser';
import config from 'config.js';

import BootState from './states/Boot';
import Loader from './states/Loader';
import Game from './states/Game';

class SocketClusterTest extends Phaser.Game {
  constructor() {
    const width = config.width;
    const height = config.height;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Loader', Loader, false);
    this.state.add('Game', Game, false);

    this.state.start('Boot');
  }
}

window.game = new SocketClusterTest();
