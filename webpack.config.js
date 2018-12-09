const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { dependencies, peerDependencies } = require('./package.json');
const externals = Object.keys(dependencies || {}).concat(Object.keys(peerDependencies || {}));

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');
const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: 'source-map',
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
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourcemap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        include: SRC_DIR,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};