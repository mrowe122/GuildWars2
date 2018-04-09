const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('../paths')

module.exports = {
  mode: 'development',
  context: path.src,
  devServer: {
    port: 9000,
    contentBase: path.src
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
          limit: 8192
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html'
    })
  ]
}
