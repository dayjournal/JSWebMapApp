const webpack = require("webpack");

module.exports = {
    mode: 'production',
    entry: './_resouce/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.(json|geojson)$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: './dist/img/icon/[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            L: 'leaflet',
            pointdata: './vector/point.geojson',
            linedata: './vector/line.geojson',
            polygondata: './vector/polygon.geojson'
        })
    ],
    devServer: {
        contentBase: __dirname + '/dist',
        publicPath: '/',
        watchContentBase: true,
        open: true
    }
};

