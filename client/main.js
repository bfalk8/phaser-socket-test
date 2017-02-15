import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import Loader from './states/Loader';
import Game from './states/Game';

class SocketClusterTest extends Phaser.Game {
  constructor() {
    const width = 800;
    const height = 600;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Loader', Loader, false);
    this.state.add('Game', Game, false);

    this.state.start('Boot');
  }
}

window.game = new SocketClusterTest();
