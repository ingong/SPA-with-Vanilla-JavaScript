module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['>= 5% in KR'],
        },
      },
    ],
  ],
  plugins: ['@babel/proposal-class-properties'],
};
