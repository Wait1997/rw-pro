const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack 版本问题导致安装^4.2.3
const TerserPlugin = require('terser-webpack-plugin');
// 拆分css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const baseConfig = require('./webpack.base.config');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name]-[chunkhash:8].js',
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
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // js多线程压缩
      new TerserPlugin({
        parallel: true,
      }),
      // 也可以放到plugins配置 压缩css
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g, // 正则表达式，用于匹配需要优化或者压缩的资源名
        cssProcessor: require('cssnano'), // 用于压缩和优化CSS 的处理器，默认是 cssnano
        cssProcessorPluginOptions: {
          // 传递给cssProcessor的插件选项，默认为{}
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true, //表示插件能够在console中打印信息，默认值是true
        discardComments: true, // 去掉注释
      }),
    ],
    // code split
    splitChunks: {
      chunks: 'all',
      // 表示抽取出来的文件在压缩前的最小大小，默认为30000
      minSize: 30000,
      // 表示抽取出来的文件在压缩前的最大大小，默认为0，表示不限制最大大小；
      maxSize: 0,
      // 表示被引用次数，默认为1
      minChunks: 1,
      cacheGroups: {
        //默认情况是会将所有来自node_modules的模块分配到一个叫vendors的缓存组；所有重复引用至少两次的代码，会被分配到default的缓存组
        default: {
          name: 'common',
          // chunks：表示从哪些chunks里面抽取代码，除了三个可选字符串值initial、async、all 之外，还可以通过函数来​​过滤所需的chunks
          chunks: 'initial',
          priority: -20, // 抽取权重，数字越大表示优先级越高
          minChunks: 2, // 模块被引用2次以上才抽离
          enforce: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      minify: {
        // 移除注释
        removeComments: true,
        // 移除空白
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[hash:8].css',
      chunkFilename: 'style/[id].[hash:8].css', // 确定非输入块文件的名称
    }),
  ],
  devtool: 'eval-cheap-source-map',
};

const config = merge(baseConfig, prodConfig);

module.exports = config;
