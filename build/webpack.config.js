const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('../paths')

module.exports = {
  mode: 'development',
  context: path.src,
  devServer: {
    port: 9000,
    open: true
  },
  entry: './index',
  output: {
    path: path.dev,
    filename: '[name].js'
  },
  resolve: {
    modules: [
      path.src,
      'node_modules'
    ],
    extensions: ['*', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            'es2015',
            'babel-preset-react'
          ]
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html'
    })
  ]
}
