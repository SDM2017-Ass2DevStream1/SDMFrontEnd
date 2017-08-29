var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var webpack = require('webpack');

const isPRODUCTION = process.env.NODE_ENV === 'production';

console.log("Starting " + process.env.NODE_ENV + " build");

var externals = {}

var plugins = [
            new ExtractTextPlugin({
                filename: 'css/index.css',
                allChunks: true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                filename: "js/vendor.bundle.js"
            }),
            new webpack.EnvironmentPlugin(['NODE_ENV']),
            new CleanWebpackPlugin(
                [
                    'dist/js/app.js',
                    'dist/js/app.js.map',
                    'dist/js/vendor.bundle.js',
                    'dist/js/vendor.bundle.js.map',
                    'dist/css/index.css',
                    'dist/css/index.css.map'
                ],
            {

            })
    ]

if(isPRODUCTION){
    externals =
        {
            "react": "React",
            "react-dom": "ReactDOM",
            "react-router": "ReactRouter",
            "react-router-dom": "ReactRouterDOM",
            "redux": "Redux",
            "react-redux": "ReactRedux"
        }
    plugins = plugins.concat([
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true
                },
                comments: false
            }),
        ])
}

module.exports = {
    externals: externals,
    entry: {
        app: ['babel-polyfill','./src/main.js', './src/styles/style.js'],
        vendor: ['redux-thunk', 'redux-logger'],
    },
    output: {
        path: './dist',
        filename: 'js/[name].js',
    },
    plugins: plugins,
    devtool: 'source-map',
    module: {
        loaders:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:{
                    presets:['es2015','react', 'stage-1']
                }
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:{
                    plugins:['transform-decorators-legacy' ],
                    presets:['es2015','react','stage-1']
                }
            },
            {
                test: /.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:[
                        {loader:'css-loader', options: {minimize: isPRODUCTION}},
                        {loader: 'postcss-loader'},
                        {loader: 'less-loader'}
                    ]
                })
            },
            {
                test: /.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {minimize: isPRODUCTION}}
                    ]
                })
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&publicPath=../&outputPath=fonts/'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?publicPath=../&outputPath=fonts/'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file-loader?publicPath=../&outputPath=imgs/',
                        {
                            loader: 'image-webpack-loader',
                            query:{
                                optipng:{
                                    optimizationLevel: 7
                                },
                                pngquant: {
                                    quality: '65-80',
                                    speed: 3
                                }
                            }
                        }
                    ],
                exclude: /node_modules/
            }
        ]
    }
}
