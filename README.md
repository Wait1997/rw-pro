#### 缺少 js 兼容性处理

- @babel/preset-env 基本的兼容性处理
- core-js 按需兼容

#### js 压缩

- `terser-webpack-plugin` 因为 `uglifyjs-webpack-plugin` 不支持 es6

#### 缺少 eslint 规则

- eslint、eslint-loader

#### 缓存 babel 缓存有、文件缓存还没有

- babel 缓存
- 文件资源缓存：加 hash 值 或 加 chunkhash 或 加 contenthash

#### postcss 兼容性处理

- .browserslistrc

#### tree shaking 去除无用代码

1. 在 `package.json` 中配置，`"sideEffects": false `所有代码都没有副作用(都可以被 tree shaking)
2. 问题：可能会把` css / @babel/polyfill` (副作用)文件干掉，要写成`"sideEffects": ["*.css"]`

> 前提：1.必须使用 ES6 模块化 2.开启 production 环境
> 作用：减少代码体积

#### code split(代码分割)

- 业务代码和第三方库分离打包，实现代码分割
- 业务代码中的公共业务模块提取打包到一个模块
- 第三方库最好也不要全部打包到一个文件中，因为第三方库加起来通常会很大，把一些特别大的库单独打包，剩下的加起来如果还是特别大，就按照一定大小分割成若干模块

#### 懒加载和预加载

#### 多线程打包 thread-loader

#### externals

- 某些包过大 不通过打包方式引入

#### AutoDllPlugin 对某些库（第三方库：）进行单独打包

##### 注：

1.  dev 环境

- 优化打包构建速度
- 优化代码调试

2.  prod 环境

- 优化打包构建速度
- 优化代码运行的性能
