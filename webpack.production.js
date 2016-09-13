var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

webpackConfig.devtool = null;
webpackConfig.plugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {warnings: false},
    sourceMap: false
  })
];

module.exports = webpackConfig;
