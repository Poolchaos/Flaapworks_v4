const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      { test: /\.ts$/, enforce: 'pre', use: ['ts-loader', 'tslint-loader']},
      { test: /\.(html)$/, use: ['html-loader'] }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])   
  ]
};
