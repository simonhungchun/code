const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');
const glob = require('glob');
const views = glob
  .sync(path.resolve(__dirname, './src/views/*/*.html'))
  .reduce((prev, current) => {
    const key = current.match(/\/views\/(\w+)\//)[1];
    prev[key] = current.replace('.html', '');
    return prev;
  }, {});
module.exports = {
  entry: {
    ...views,
    common: './src/index.js',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[fullhash:8].js',
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
    open: ['/home.html'],
    // 配置前端请求代理
    proxy: {
      '^/api': {
        target: 'https://www.starbucks.com.cn/',
      },
      '^/bff': {
        target: 'https://bff.starbucks.com.cn/',
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
      filename: '[name].[contenthash:8].css',
    }),
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    //   cdn: {
    //     script: [
    //       'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js',
    //       'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.min.js',
    //     ],
    //     style: [],
    //   },
    // }),
    ...Object.entries(views).map(
      ([key, value]) =>
        new HtmlWebpackPlugin({
          template: value.replace(/$/, '.html'),
          chunks: ['common', key],
          filename: `${key}.html`,
        })
    ),
  ],
};
