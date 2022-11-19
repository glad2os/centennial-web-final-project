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
        public: ['./src/assets/js/index.js', './src/assets/css/index.scss']
    },
    module: {
        rules: [
            javaScript(), scss()
        ]
    }, output: {
        filename: './[name].js', path: path.resolve(__dirname, './dist'),
    }, resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss']
    }, plugins: [
        new MiniCssExtractPlugin({
            filename: './[name].css',
        }),
    ]
});