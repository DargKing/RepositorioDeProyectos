const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: "production",
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  entry: ['regenerator-runtime/runtime.js', './src/index.js'],
  output: {
    path: path.join(`${__dirname}/src/public`),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],

          },
        },
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};
