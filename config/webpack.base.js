const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const scss = () => ({
    test: /\.(sass|scss|css)$/,
    exclude: /node_modules/,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                url: false,
            }
        },
        'sass-loader']
});

const javaScript = () => ({
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
        },
    },
});

module.exports.commonConfig = () => ({
    entry: {
        public: ['./assets/js/index.js', './assets/css/main.scss']
    },
    module: {
        rules: [
            javaScript(), scss()
        ]
    }, output: {
        filename: './js/[name].js', path: path.resolve(__dirname, '../public'),
    }, resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css']
    }, plugins: [
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
        }),
    ]
});