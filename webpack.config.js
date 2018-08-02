/* eslint-env node */

//remember to bring back in Extract-text-plugin for production to fix flash of unstyled code
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const webpack = require('webpack');
const path = `${__dirname}/build`;

module.exports = {
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
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(`${path}/bundle.*.js`),
    new HtmlPlugin({ template: './app/src/index.html' }),
    new Dotenv({
      systemvars: true
    }),
    new CopyWebpackPlugin([
      // relative path is from src
      { from: './app/src/assets/favicon.ico' }
    ]),
    // new webpack.DefinePlugin({
    //   // Dynamically access local environment variables based on the environment
    //   ENV: JSON.stringify(require(path.join(__dirname, "src", "config", env))),
    //   "process.env": {
    //     // can specify development environment in here as well
    //     "GITHUB_TOKEN": JSON.stringify(process.env.GITHUB_TOKEN)
    //   }
    // })
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
            loader: 'style-loader',
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
};