const manifest = {
  // [key, url]
  images: [],
  // [key, url, frameWidth, frameHeight]
  spritesheets: [['gamepad', 'gamepad_spritesheet.png', 100, 100]],
  // [key, url] needs to be Tiled JSON
  tilemaps: [['houseMap', 'houseTemplate.json']],
  // [key, url] tileset needs to be in the tilemaps directory
  tilesets: [['collisionSet', 'collision32.png'], ['houseSet', 'tilesetHouse.png']],
  // [key, url]
  audio: [],
  // NOT IMPLEMENTED
  fonts: [],
  // NOT IMPLEMENTED
  bitmap_fonts: []
};

export default manifest;
