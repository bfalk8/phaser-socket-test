function Player() {
  this.x = 0;
  this.y = 0;
  this.velocity = {x: 0, y: 0};
}

Player.prototype.update = function({x, y, velocity}) {
  this.x = x || this.x;
  this.y = y || this.y;
  this.velocity = velocity || this.velocity;
};

module.exports = Player;
