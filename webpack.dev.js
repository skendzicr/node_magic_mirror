let config = require('./webpack.common.js');

config.output.filename = 'bundle.js';


config = Object.assign({}, config, {
    devServer: {
        port: 8080,
        proxy: {
            '/': {
                target: 'http://localhost:3000/',
                changeOrigin: true
            }
        }
    },
    devtool: 'source-map',
    debug: true
});

module.exports = config;
