const webpack = require("webpack")
const path    = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
var inProduction = (process.env.NODE_ENV === 'prod')

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
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),

        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        })
    ]
}

if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
} 