const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {dependencies, peerDependencies} = require('./package.json');
const externals = Object.keys(dependencies || {}).concat(Object.keys(peerDependencies || {}));

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');
const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    flatitude: path.resolve(SRC_DIR, 'flatitude.js')
  },
  output: {
    path: DIST_DIR,
    filename: '[name].js',
    library: 'flatitude',
    libraryTarget: 'umd'
  },
  externals,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        include: SRC_DIR,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        include: SRC_DIR,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              minimize: PROD,
              sourcemap: true
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
                minimize: PROD,
                sourcemap: true,
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