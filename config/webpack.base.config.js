const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // thread-loader会对其后面的loader(babel-loader)开启多线程打包，进程启动大概需要花费600ms，进程通信也有开销(只有耗时比较长的才开启)
        use: [
          {
            // 开启多线程打包
            loader: 'thread-loader',
            options: {
              workers: 2, // 进程数量 2 个
            },
          },
          {
            loader: 'babel-loader',
            // 开启babel缓存
            options: {
              // 第二次构建会读取之前的缓存
              cacheDirectory: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/',
            limit: 8 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    // import导入时省略后缀
    // 注意：尽可能的减少后缀尝试的可能性
    extensions: ['.js', '.jsx', '.json'],
    // import导入时别名，减少耗时的递归解析操作
    alias: {
      '@': path.resolve('src'),
    },
  },
};
