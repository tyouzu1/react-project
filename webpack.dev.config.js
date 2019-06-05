const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  // mode: 'production',
  devtool: 'eval-source-map',
  plugins: [

    new webpack.DefinePlugin({
      __DEV__: 'true',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['react-hot-loader/webpack'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader', // 将 JS 字符串生成为 style 节点
          },
          {
            loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader', // 将 Sass 编译成 CSS
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // 将 JS 字符串生成为 style 节点
          },
          {
            loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader', // 将 Sass 编译成 CSS
          },
          {

            loader: 'postcss-loader', // 将 Sass 编译成 CSS
          },
        ],
      },
    ],
  },
});
