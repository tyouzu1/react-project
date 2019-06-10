const webpack = require('webpack');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const config = require('./webpack.dev.config.js');

const port = 4000;
const ip = 'localhost';
config.plugins.push(new OpenBrowserPlugin({ url: `http://${ip}:${port}` }));
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  inline: true,
  historyApiFallback: true,
  contentBase: path.join(__dirname, './dist'),
  overlay: {
    errors: true,
  },
}).listen(port, ip, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at http://${ip}:${port}`);
});
