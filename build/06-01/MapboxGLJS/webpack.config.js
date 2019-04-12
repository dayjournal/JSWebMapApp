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
            mapboxgl: 'mapbox-gl',
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

