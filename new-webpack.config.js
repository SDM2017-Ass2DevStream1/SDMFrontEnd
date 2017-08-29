// https://github.com/petehunt/webpack-howto
// http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html
const kit = require('nokit');
const webpack = require('webpack');
const CleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const { join } = kit.path;

const BUILD_PATH = join(__dirname, 'dist');
// const SRC_PATH = join(__dirname, 'src');

const isProd = kit.isProduction();

// FIXME: config CDN address for production
const publicPath = `${isProd ?
  'https://d21ps49l69jsm6.cloudfront.net' : ''
}/static/`;

const cssExtractor = new ExtractTextPlugin({
  filename: '[name].[contenthash:8].css',
  allChunks: true,
});

const plugins = [

];

if (isProd) {
  plugins.concat([
    new CleanupPlugin(BUILD_PATH),

    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      compress: {
        warnings: false,
      },
    }),
  ]);
}

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './src/main.js',
      './src/styles/style.js',
    ],
    vendor: ['redux-thunk', 'redux-logger'],
  },

  output: {
    path: BUILD_PATH,
    filename: '[name].[chunkhash:8].js',
    publicPath,
  },

  devtool: false,


  stats: {
    hash: false,
    chunks: false,
    chunkModules: false,
    children: false,
  },

  plugins,
};
