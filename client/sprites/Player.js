import Phaser from 'phaser';

export default class Player extends Phaser.Sprite {
  constructor({game, x = 0, y = 0, asset}) {
    let graphic = game.make.bitmapData(75,175);
    graphic.rect(0,0,75,175,'#ffffff');
    super(game, x, y, graphic);
    this.anchor.setTo(0.5);
    game.add.existing(this);
    game.physics.arcade.enable(this);
    this.body.gravity.y = 0;

    this.moveSpeed = 100;
    // this.controls = game.input.keyboard.addKeys( { 
    //   'up': Phaser.KeyCode.W,
    //   'down': Phaser.KeyCode.S,
    //   'left': Phaser.KeyCode.A,
    //   'right': Phaser.KeyCode.D } );
    this.controls = game.input.keyboard.createCursorKeys();
  }

  update() {
    let velocity = this.handleControls();
    this.body.velocity.x = velocity.x;
    this.body.velocity.y = velocity.y;
    // TODO: changed this to user Phaser's Signal system
    this.game.socketHandler.send('update', 
      {
        x: this.x,
        y: this.y,
        velocity: {
          x: this.body.velocity.x,
          y: this.body.velocity.y
        }
      });
  }

  handleControls() {
    let velocity = {x: 0, y: 0};
    if(this.controls['up'].isDown) velocity.y -= this.moveSpeed;
    if(this.controls['down'].isDown) velocity.y += this.moveSpeed;
    if(this.controls['right'].isDown) velocity.x += this.moveSpeed;
    if(this.controls['left'].isDown) velocity.x -= this.moveSpeed;

    return velocity;
  }
}
