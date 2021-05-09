const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const port = process.env.PORT || 3000;

module.exports = (env) => {
  return {
    mode: (env.production) ? 'production' : 'development',
    entry: {
      options: './src/options.js',
    },
    output: {
      path: __dirname + '/public',
      filename: '[name].[contenthash].js'
    },
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'options.html',
        template: 'src/options.html'
      })
    ],
    devtool: 'nosources-source-map',
    devServer: {
      port,
      contentBase: path.join(__dirname, 'public'),
    }
  };
};