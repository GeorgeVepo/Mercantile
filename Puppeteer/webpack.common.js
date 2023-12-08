const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    app: './src/app.ts'
  },
  resolve: {
    fallback: {
      "supports-color": false,
      "utf-8-validate": false,
      "bufferutil": false,
      "puppeteer-core": false,
      "puppeteer-extra-plugin-stealth": false

    },
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  target: 'node',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }]

  },
  plugins: [
  ]
};