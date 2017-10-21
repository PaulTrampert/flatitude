const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');
const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    flatitude: path.resolve(SRC_DIR, 'flatitude.js')
  },
  output: {
    path: DIST_DIR,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: SRC_DIR,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              minimize: PROD
            }
          }
        })
      },
      { 
        test: /\.less$/,
        include: SRC_DIR,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: PROD
              }
            },
            'less-loader'
          ]
        })
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
};