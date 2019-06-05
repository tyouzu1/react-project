const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackMerge = require('webpack-merge');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const path = require('path');
const baseConfig = require('./webpack.base.config.js');
// const outputPath = 'dist';

/* eslint-disable global-require */
module.exports = webpackMerge(baseConfig, {
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true, // Boolean/String,字符串即是缓存文件存放的路径
        sourceMap: false,
        parallel: true,
        terserOptions: {
          ecma: 8,
        },
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.(sa|sc|c)ss$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
        canPrint: true,
        autoprefixer: false,
      }),
      // new BundleAnalyzerPlugin(),
    ],
  },
  mode: 'production',
  plugins: [

    new MiniCssExtractPlugin({
      publicPath: './css',
      filename: 'css/[name].css',
      chunkFilename: 'css/[name]_[id].css',
    }),
    // new CleanWebpackPlugin([outputPath], {
    //   root: path.resolve(__dirname, '../'), // 根目录
    //   // verbose Write logs to console.
    //   verbose: true, // 开启在控制台输出信息
    //   // dry Use boolean "true" to test/emulate delete. (will not remove files).
    //   // Default: false - remove files
    //   dry: false,
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
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
