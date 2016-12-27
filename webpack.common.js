const webpack = require('webpack');
const path = require('path');

const HtmlPlugin = require('html-webpack-plugin');
const cssnext = require('postcss-cssnext');

module.exports = {
    entry: {
        app: ['./src/js/client']
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js', '.webpack.js', '.scss', '.html']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['latest', 'stage-0'],
                    cacheDirectory: true
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader', 'sass-loader', 'postcss?parser=postcss-scss']
            },
            {
                test: /\.(jpg|png|gif|svg|ttf|woff|eot|woff2)$/,
                exclude: /node_modules/,
                loaders: ['url-loader?limit=10000']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }

        ]
    },
    postcss: function () {
        return {
            plugins: [cssnext]
        };
    },
    plugins: [
        new HtmlPlugin({
            title: 'Node Magic Mirror',
            filename: 'index.html',
            template: 'src/views/index.html'
        })
    ]
};
