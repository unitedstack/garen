/**
 * @PengJiyuan
 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const lessToJs = require('less-vars-to-js');

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
  let themer = lessToJs(fs.readFileSync(path.join(__dirname, './theme/index.less'), 'utf8'));
  let webpackConfig = {

    context: __dirname,

    entry: entry,

    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].min.js',
      publicPath: 'client/dist',
      chunkFilename: '[id].bundle.js'
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
            loader: `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(themer)}}`
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
      new ExtractTextPlugin({filename: '[name].min.css'}),
      new webpack.LoaderOptionsPlugin({
        debug: true
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
    },

    devServer: {
      contentBase: path.join(__dirname),
      compress: true,
      inline: true,
      historyApiFallback: true, // 解决404
      port: 8888
    },

    devtool: 'cheap-source-map'
  };

  return webpackConfig;
};
