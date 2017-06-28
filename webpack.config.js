const webpack = require("webpack")
const path = require("path")
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const PurifyCSSPlugin = require('purifycss-webpack')
const inProduction = (process.env.NODE_ENV === 'prod')

module.exports = {
    entry: {
        app: [
            './src/main.js',
            './src/assets/css/main.scss'
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: ['raw-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[hash].[ext]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'index.html')),
            minimize: inProduction
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        }),
    ]
}

if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
} 