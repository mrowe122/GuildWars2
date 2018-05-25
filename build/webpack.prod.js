const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const path = require('../paths')
const common = require('./webpack.common')
const merge = require('webpack-merge')

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.dist,
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      minify: { collapseWhitespace: true }
    }),
    new CopyWebpackPlugin([
      { from: 'media', to: 'media' }
    ]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
  ]
})