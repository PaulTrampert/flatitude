var webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'doc_src');
const DOCS_DIR = path.resolve(__dirname, 'doc');

webpackConfig.devtool = 'sourcemap'

webpackConfig.entry =  {
  docs: path.resolve(SRC_DIR, 'index.js')
};

webpackConfig.output = {
  path: DOCS_DIR,
  filename: "[name].js"
};

webpackConfig.devServer = {
  contentBase: DOCS_DIR,
  hot: true,
};

webpackConfig.plugins.push(new HtmlWebpackPlugin({
  title: "Flatitude",
  template: path.resolve(SRC_DIR, "index.ejs")
}));
webpackConfig.plugins.push(new webpack.NamedModulesPlugin());
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

delete webpackConfig.externals;

module.exports = webpackConfig;