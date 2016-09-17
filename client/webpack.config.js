var path = require('path'),
    webpack = require('webpack'),
    minify = process.argv.indexOf('--minify') !== -1,
    production = process.argv.indexOf('--production') !== -1,
    plugins = [];

if (minify) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}

if (production) {
    plugins.push(new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }));
}


module.exports = {

    context: __dirname,
    entry: __dirname + "/app/main.js",
    output: {
        path: '../api/public/',
        filename: "app.min.js"
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    plugins: plugins
};