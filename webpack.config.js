const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const mode = process.env.NODE_ENV;

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  devtool: mode === 'development' ? 'eval-source-map' : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '/public/index.html',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@public': path.resolve(__dirname, 'public'),
    },
  },
};
