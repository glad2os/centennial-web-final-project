const base = require('./webpack.base.js');
const {merge} = require('webpack-merge');

module.exports = (env) => {
    switch (env.MODE) {
        case 'development':
            return merge({mode: 'development', devtool: 'source-map'}, base.commonConfig())
        case 'production':
            return merge({mode: 'production'}, base.commonConfig())
        default:
            throw new Error('No matching configuration was found!');
    }
}