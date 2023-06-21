const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');
console.log(
  'process.env.npm_package_config_port',
  process.env.npm_package_config_port
);
module.exports = {
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.[fullhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(woff | eot | ttf | otf | svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  mode: process.env.NODE_ENV,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  externals: {
    jquery: 'jQuery',
    lodash: '_',
  },
  devServer: {
    open: true,
    // 配置前端请求代理
    proxy: {
      // 在开发环境下面代理的目标是http://127.0.0.1:3000
      // 在生产环境下面代理的目标是http://api.cc0820.top:3000
      '^/api': {
        target:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:3000'
            : process.env.NODE_ENV === 'production'
            ? 'http://api.cc0820.top:3000'
            : '',
        pathRewrite: { '/api': '' },
      },
      '^/api1': {
        target: 'http://127.0.0.1:3001',
        pathRewrite: { '/api1': '' },
      },
    },
    client: {
      overlay: false,
    },
  },
  plugins: [
    new WebpackBar(),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      cdn: {
        script: [
          'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js',
          'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.min.js',
        ],
        style: [],
      },
    }),
  ],
};
