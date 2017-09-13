// https://github.com/petehunt/webpack-howto
// http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html
const nib = require('nib');
const kit = require('nokit');
const webpack = require('webpack');
const HappyPack = require('happypack');
const autoprefixer = require('autoprefixer');
const CleanupPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');


const { join } = kit.path;

const BUILD_PATH = join(__dirname, 'dist');
const SRC_PATH = join(__dirname, 'src');
const STYLES_SRC_PATH = join(__dirname, 'styles');
const NODE_MODULES_PATH = join(__dirname, 'node_modules');

const isProd = kit.isProduction();
const fileLoaderCompiledName = '[name].[hash:8].[ext]';

const cssExtractor = new ExtractTextPlugin({
  filename: '[name].[contenthash:8].css',
  allChunks: true,
});

const cssLoader = {
  loader: 'css-loader',
  options: {
    minimize: isProd,
  },
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      autoprefixer({
        browsers: [
          'last 3 versions',
        ],
      }),
    ],
  },
};

let plugins = [
  new CleanupPlugin(BUILD_PATH),

  new webpack.DefinePlugin({
    __DEV__: !isProd,
  }),

  new webpack.optimize.ModuleConcatenationPlugin(),

  new webpack.HashedModuleIdsPlugin(),

  // https://github.com/webpack/webpack/tree/master/examples/two-explicit-vendor-chunks
  new webpack.optimize.CommonsChunkPlugin({
    name: 'main',
    minChunks: Infinity,
  }),

  new HappyPack({
    id: 'js',
    threads: 4,
    loaders: [
      {
        path: 'babel-loader',
      },
    ],
  }),

  new ManifestPlugin(),

  cssExtractor,
];

if (isProd) {
  plugins = plugins.concat([
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
  entry: './src/index.jsx',

  output: {
    path: BUILD_PATH,
    filename: '[name].[chunkhash:8].js',
    publicPath: '/static/',
  },

  devtool: false,

  resolve: {
    modules: [
      SRC_PATH,
      NODE_MODULES_PATH,
    ],
    extensions: ['.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'happypack/loader',
        options: {
          id: 'js',
        },
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.css$/,
        loader: cssExtractor.extract({
          fallback: 'style-loader',
          use: [
            cssLoader,
            postcssLoader,
          ],
        }),
      },
      {
        test: /\.styl$/,
        loader: cssExtractor.extract({
          fallback: 'style-loader',
          use: [
            cssLoader,
            postcssLoader,
            {
              loader: 'stylus-loader',
              options: {
                paths: STYLES_SRC_PATH,
                use: [nib()],
              },
            },
          ],
        }),
      },
      {
        test: /\.ico$/,
        loader: 'file-loader',
        options: {
          name: fileLoaderCompiledName,
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: [
          {
            loader: 'file-loader',
            options: {
              name: fileLoaderCompiledName,
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },

  stats: {
    hash: false,
    chunks: false,
    chunkModules: false,
    children: false,
  },

  plugins,
};
