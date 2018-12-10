/* eslint-env node */

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = `${__dirname}/build`;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
console.log('node env', process.env.NODE_ENV);

module.exports = env => ({
  entry: './app/src/main.js',
  output: {
    path,
    filename: 'bundle.[hash].js',
    publicPath: ''
  },
  devServer: {
    contentBase: './build',
    historyApiFallback: true
  },
  devtool: env === 'production' ?
    'cheap-eval-source-map' :
    'inline-source-map',
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     // defaults the environment to development if not specified
    //     'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    //   }
    // }),
    new ExtractTextPlugin('styles.css'),
    new CleanWebpackPlugin(`${path}/bundle.*.js`),
    new HtmlPlugin({ template: './app/src/index.html' }),
    new Dotenv({
      systemvars: true //allows netlify system variables to work in production
    }),
    new CopyWebpackPlugin([
      // relative path is from src
      { from: './app/src/assets/favicon.ico' }
    ])
  ],
  module: {
    rules: [
      {   
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: env === 'production' ?
              ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
              }) :
              'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: { 
              sourceMap: true,
              importLoaders: 1 
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(pdf|jpg|png|gif|svg|ico)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 5000 },
        }
      }
    ]
  }
});
