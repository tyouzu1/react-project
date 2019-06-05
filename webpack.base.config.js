const path = require('path');
const webpack = require('webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');

const outputPath = 'dist';
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, outputPath),
    publicPath: '/',
    chunkFilename: 'js/[name].[chunkhash].js',
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // include: path.resolve(__dirname, 'src'),
        // options: { presets: ['@babel/preset-env'] },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
      },
      {
        test: /\.(png|jpg|gif|webp|woff|eot|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'img/[name].[ext]',
            limit: 3000,
          },
        },

      },
      {
        test: /\.less$/,
        exclude: /src/,
        use: [
          {
            loader: 'style-loader', // 将 JS 字符串生成为 style 节点
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                // '@primary-color': '#1DA57A',
              },
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    ...Object.keys(pkg.library).map(name => new webpack.DllReferencePlugin({
      context: __dirname,
      // 引入打包后生生成的manifest文件
      manifest: require(`./static/dll/${name}.manifest.json`), // eslint-disable-line   
    })),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      cache: false,
    }),
    new AddAssetHtmlPlugin(Object.keys(pkg.library).map(name => ({
      filepath: require.resolve(path.resolve(`./static/dll/${name}.dll.js`)),
      includeSourcemap: false,
      outputPath: 'dll',
      publicPath: '/dll',
    }))),
  ],
};
