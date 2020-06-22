const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',

    // module: {

    // },

    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],

    devServer: {
        port: '4200',
        historyApiFallback: true
    }
}