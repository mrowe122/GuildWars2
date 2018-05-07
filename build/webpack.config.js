const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const path = require('../paths')

module.exports = {
  mode: 'development',
  context: path.src,
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
  entry: ['react-hot-loader/patch', './normalize', './index'],
  output: {
    path: path.dev,
    filename: '[name].js'
  },
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
    extensions: ['*', '.js', '.jsx']
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
}
