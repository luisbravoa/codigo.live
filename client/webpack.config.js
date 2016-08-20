module.exports = {

    context: __dirname,
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname,
        filename: "app.min.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};