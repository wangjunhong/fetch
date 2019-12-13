const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'fetch.min.js',
    libraryTarget: 'umd'
  },
  mode:"development"
}