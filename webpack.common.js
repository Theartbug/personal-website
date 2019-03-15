const path = `${__dirname}/build`;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './app/src/main.js',
  output: {
    path,
    filename: 'bundle.[hash].js',
    publicPath: ''
  },
  plugins: [
    new CleanWebpackPlugin(`${path}`),
    new HtmlPlugin({ template: './app/src/index.html' }),
    new CopyWebpackPlugin([
      // relative path is from src
      { from: './app/src/assets/favicon.ico' }
    ]),
    new Dotenv({
      systemvars: true //allows netlify system variables to work in production
    }),
  ],
};