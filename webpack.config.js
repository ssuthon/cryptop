var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['babel-regenerator-runtime', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: 'main.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};