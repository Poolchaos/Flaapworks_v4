const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader', options: { /* Loader options go here */ } }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  }
};
