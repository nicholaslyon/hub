const path = require('path');
const webpack = require('webpack');

/**
 * Configurable Webpack config
 * @param  {object} config Configuration from gulpfile
 * @return {object}
 */
module.exports = function webpackConfig(config) {
  return {
    mode: config.isDev ? 'development' : 'production',
    entry: config.scripts.src,
    output: {
      path: path.resolve(__dirname, config.scripts.dest),
      filename: '[name].js',
    },
    devtool: config.isDev ? '#eval-source-map' : '',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          include: path.join(__dirname, 'src'),
          use: {
            loader: 'babel-loader',
          }
        }
      ],
    },
    // plugins: TODO - uglify on prod build
  };
};
