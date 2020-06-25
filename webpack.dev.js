const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                use: ['file-loader']
            }
        ]
    },

    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],

    devtool: 'eval-cheap-module-source-map',

    devServer: {
        port: '4200',
        historyApiFallback: true
    }
}