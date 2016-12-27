const webpack = require('webpack');
const Md5Hash = require('webpack-md5-hash');
const ExtractText = require('extract-text-webpack-plugin');
let config = require('./webpack.common.js');

config.output.filename = 'bundle.js';

config.plugins = [
    new Md5Hash(),
    new ExtractText('main.scss'),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    ...config.plugins
];

config.module.loaders[1].loaders = undefined;
config.module.loaders[1].loader = ExtractText.extract(['css', 'sass', 'postcss?parser=postcss-scss']);
module.exports = config;
