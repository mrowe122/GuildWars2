const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('../paths')

const __DEV__ = process.env.NODE_ENV === 'development'
const __TEST__ = process.env.NODE_ENV === 'test'
const __MOCK__ = process.env.NODE_ENV === 'mock'
const __PROD__ = process.env.NODE_ENV === 'production'

module.exports = {
  context: path.src,
  entry: ['react-hot-loader/patch', './normalize', './index'],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 5
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10
        }
      }
    }
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
        use: [{
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            plugins: [
              'emotion',
              'babel-plugin-transform-class-properties',
              [ 'transform-object-rest-spread', { 'useBuiltIns': true } ]
            ],
            presets: [
              'babel-preset-react',
              [
                'babel-preset-env', {
                  targets: {
                    ie9: true,
                    uglify: true,
                    modules: false
                  }
                }
              ]
            ]
          }
        }]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(scss|css)$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 24576
        }
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new CopyWebpackPlugin([
      { from: 'media', to: 'media' }
    ]),
    new webpack.DefinePlugin({
      __DEV__,
      __TEST__,
      __MOCK__,
      __PROD__
    })
  ]
}
