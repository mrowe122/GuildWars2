const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const path = require('../paths')
const common = require('./webpack.common')
const merge = require('webpack-merge')

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.dev,
    filename: '[name].js'
  },
  devtool: 'source-map',
  devServer: {
    port: 9000,
    host: '0.0.0.0',
    contentBase: path.src,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:9001'
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'media', to: 'media' }
    ]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CircularDependencyPlugin({
      failOnError: true
    })
  ]
})
