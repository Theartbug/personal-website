const path = `${__dirname}/build`;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/main.tsx',
  output: {
    path,
    filename: 'bundle.[hash].js',
    publicPath: ''
  },
  resolve: {
      extensions: [ '.tsx', '.ts', '.js', '.jsx' ]
  },
  plugins: [
    new CleanWebpackPlugin(`${path}`),
    new HtmlPlugin({ template: './src/index.html' }),
    new CopyPlugin({
      // relative path is from src
      patterns: [{ from: './src/assets/favicon.ico'}]
    }),
    new Dotenv({
      systemvars: true //allows netlify system variables to work in production
    }),
  ],
};