const path = require('path');

module.exports = {
  mode: 'development',

  devServer: {
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        resolve: {
          alias: {
            '@': path.resolve(__dirname, 'src'),
            '@public': path.resolve(__dirname, 'public'),
          },
        },
      },
    ],
  },
};
