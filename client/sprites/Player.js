import Phaser from 'phaser';

export default class Player extends Phaser.Sprite {
  constructor({game, x = 0, y = 0, asset}) {
    let graphic = game.make.bitmapData(32,32);
    graphic.rect(0,0,32,32,'#ffffff');
    super(game, x, y, asset || graphic);
    game.add.existing(this);
    game.physics.arcade.enable(this);

    this.moveSpeed = 100;
    // this.controls = game.input.keyboard.addKeys( { 
    //   'up': Phaser.KeyCode.W,
    //   'down': Phaser.KeyCode.S,
    //   'left': Phaser.KeyCode.A,
    //   'right': Phaser.KeyCode.D } );
    this.controls = game.input.keyboard.createCursorKeys();
    this.gamepad = game.controls;
  }

  create() {
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
  }

  update() {
    let velocity = this.handleControls();
    this.body.velocity.x = velocity.x*this.moveSpeed;
    this.body.velocity.y = velocity.y*this.moveSpeed;
    // FIXME: changed this to user Phaser's Signal system
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
    let velocity = {x: this.gamepad.joystick.properties.x/100.0, y: this.gamepad.joystick.properties.y/100.0};
    if(this.controls['up'].isDown) velocity.y -= 1;
    if(this.controls['down'].isDown) velocity.y += 1;
    if(this.controls['right'].isDown) velocity.x += 1;
    if(this.controls['left'].isDown) velocity.x -= 1;

    if(this.gamepad.btn.isDown) {
      this.tint = Math.random()*255*3;
    }

    return velocity;
  }
}
