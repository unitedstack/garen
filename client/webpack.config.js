const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const os = require('os');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const menifestConfig = require('./manifest.json');

let language = process.env.npm_config_lang || process.env.language;

// Default language
if (!language) {
  language = 'zh-CN';
}

let entry = {};
fs.readdirSync('./applications')
  .filter(function(m) {
    return fs.statSync(path.join('./applications', m)).isDirectory();
  })
  .forEach(function(m) {
    entry[m] = ['babel-polyfill', './applications/' + m + '/index.jsx'];
  });

module.exports = (env) => {
  // production mode
  let webpackConfig = {

    context: __dirname,

    entry: entry,

    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[hash:6].' + language + '.[name].min.js',
      publicPath: '/client/dist',
      chunkFilename: '[hash:6].' + language + '.[id].bundle.js'
    },

    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules|moment/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: process.env.NODE_ENV !== 'production'
          }
        }
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [autoprefixer];
              }
            }
          }, {
            loader: 'less-loader'
          }]
        })
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [autoprefixer];
              }
            }
          }]
        })
      }],
      noParse: [
        /moment/g
      ]
    },

    // only show valid/invalid and errors
    // deal with verbose output
    stats: {
      assets: true,
      colors: true,
      warnings: true,
      errors: true,
      errorDetails: true,
      entrypoints: true,
      version: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      children: false
    },

    plugins: [
      new ExtractTextPlugin({
        filename: '[hash:6].[name].min.css',
        allChunks: true
      }),
      new UglifyJSPlugin({
        parallel: os.cpus().length
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.DllReferencePlugin({
        context: path.join(__dirname),
        manifest: menifestConfig
      })
    ],

    resolve: {
      extensions: ['.jsx', '.js', 'json'],
      modules: [
        path.resolve(__dirname, '../'),
        'node_modules'
      ],
      alias: {
        'uskin': 'client/uskin',
        'react': 'node_modules/react',
        'react-dom': 'node_modules/react-dom',
        'moment': 'client/libs/moment'
      }
    }
  };

  if(env && env.development) {
    webpackConfig.watch = true;
    webpackConfig.devtool = 'cheap-source-map';
    webpackConfig.output.path = path.resolve(__dirname, './dist');
    webpackConfig.output.filename = language + '.[name].min.js';
    webpackConfig.plugins = [
      new ExtractTextPlugin({filename: '[name].min.css'}),
      new webpack.LoaderOptionsPlugin({
        debug: true
      }),
      new webpack.DllReferencePlugin({
        context: path.join(__dirname),
        manifest: menifestConfig
      })
    ]
  }
  return webpackConfig;
};
