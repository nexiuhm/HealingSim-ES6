var path = require('path')
var webpack = require('webpack')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

// Phaser path
var phaserModulePath = path.join(__dirname, '/node_modules/phaser/')

// Defines global __DEV__ that can be used in game logic to decide differences between dev builds and production builds.
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
})


module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/main.js')
    ]
  },
  devtool: 'source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: 'bundle.js'
  },
  watch: true,
  plugins: [
    definePlugin,
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      open: false,
      server: {
        baseDir: ['./', './build']
      }
    })
  ],
  module: {
    loaders: [
      // Babel will transpile all ES6 files in the src folder
      { test: /\.js$/, loader: 'babel', include: path.join(__dirname, 'src') },
      // Special rules when loading ES5 libraries to make them work as modules. Some relies on global variabels to be exposed etc.
      { test: /pixi\.js/, loader: 'expose?PIXI' },
      { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
      { test: /p2\.js/, loader: 'expose?p2' },
      { test: /phaser\-input\.js$/, loader: 'exports?Fabrique=true'}
    ]
  },

  // Alias to resolve the path to the modules instead of using its full path. QoL issue
  resolve: {
    alias: {
      'phaser': path.join(phaserModulePath, 'build/custom/phaser-split.js'),
      'pixi': path.join(phaserModulePath, 'build/custom/pixi.js'), // Phaser dependency
      'p2': path.join(phaserModulePath, 'build/custom/p2.js'),     // Phaser dependency
      'phaser-input': path.join(__dirname, '/node_modules/phaser-input/build/phaser-input.js')
    }
  }
}
