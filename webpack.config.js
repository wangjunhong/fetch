const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: ['./index.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].min.js',
    libraryTarget: 'umd'
  },
  mode:"development"
}