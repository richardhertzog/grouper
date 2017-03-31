const path = require('path');
module.exports = {
  entry: path.join(__dirname, './client/index.jsx'),
  output: {
    path: path.join(`${__dirname}/dist`),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  devtool: 'source-map',
};
