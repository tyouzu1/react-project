const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const moment = require('moment');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const pkg = require('./package.json');

const outputPath = 'static/dll';

module.exports = {
  entry: {
    ...pkg.library,
  },
  output: {
    path: path.join(__dirname, outputPath),
    filename: '[name].dll.js',
    library: '[name]_library',
    // vendor.dll.js 中暴露出的全局变量
    // 主要是给DllPlugin中的name 使用
    // 故这里需要和webpack.DllPlugin 中的 'name :[name]_libray 保持一致
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      /*
       该插件的name属性值需要和 output.library保存一致，该字段值，也就是输出的 manifest.json文件中name字段的值。
       比如在jquery.manifest文件中有 name: 'dll_jquery'
      */
      path: path.join(__dirname, outputPath, '[name].manifest.json'),
      name: '[name]_library',
      context: __dirname,
    }),
    new webpack.BannerPlugin({
      banner: `${pkg.author} ${pkg.version} ${moment().format()}`,
    }),
  ],
};
