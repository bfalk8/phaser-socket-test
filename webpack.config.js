var path = require('path');
var webpack = require('webpack');

var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

var APP_DIR = path.join(__dirname, 'client');
var BUILD_DIR = path.join(__dirname, 'public');
var ASSETS_DIR = path.join(__dirname, 'assets');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(APP_DIR, 'main.js')
    ],
    vendor: ['pixi', 'p2', 'phaser']
  },
  devtool: 'cheap-source-map',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'})
  ],
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
      'assets': ASSETS_DIR
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /pixi\.js/,
        use: ['expose-loader?PIXI']
      },
      {
        test: /phaser-split\.js/,
        use: ['expose-loader?Phaser']
      },
      {
        test: /p2\.js/,
        use: ['expose-loader?p2']
      },
      { test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
        use: 'url-loader?prefix=font/&limit=10000&name=[name]-[hash].[ext]' },
      { test: /\.mp3$/,
        use: 'file-loader?hash=sha512&digest=hex&name=[name]-[hash].[ext]' },
      { test: /.*\.(gif|png|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[name]-[hash].[ext]',
          'image-webpack-loader?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]},
      { test: /\.(jpg)$/,
        use: 'url-loader?limit=25000&name=[name]-[hash].[ext]'},
      { test: /\.xml$/,
        use: 'file-loader?hash=sha512&digest=hex&name=[name]-[hash].[ext]'}
    ]
  },
};
