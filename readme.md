# seabo-cli-service

## 介绍

seabo-cli-service是一个react项目的cli打包工具，里面封装了webpack的配置。
工具向外提供两个命令，分别是`seabo-cli-service serve`用于开发，`seabo-cli-service build`用于生产环境的构建。

## 为什么要写这个工具

目前来说要打包一个react项目，比较好的方式有两种：
一种是使用`create-react-app`提供的`react-script`来打包；
另一种则是自己写`webpack.config.js`来打包。


这两种方案各有优缺点：

使用`create-react-app`的优点是，开发人员可以不用介入一系列复杂的webpack配置中，
可以全身心的写业务代码。缺点是由于工具的封装较强，当开发人员有需求需要改变webpack配置时，
比如需要改变babel的preset或者增加一个plugin时，需要熟悉`react-script`及社区的一些用于配置
`react-script`的工具，众所周知，依赖的代码越多就越难维护，也越容易出问题。当我们想要升级里面
某个工具时，可能很难甚至无法做到，由此不得不迁就现有的工具，从而间接的导致效率的降低。


完全自己写`webpack.config.js`这种方式的优点是，完全由开发人员自己control一切，可以很方便的
修改或升级工具链。缺点是，工具代码集成在业务代码库中，当同时有多个项目时，我们可能需要在每个项目
中都拷贝一份`webpack.config.js`，拷贝起来虽然很方便，但是后期维护就比较困难了。假如我们想要给每个项目
都加上pwa的支持或是修复某个bug，可能需要给每个项目都来一次升级。

## 工具的结构

工具copy了`vue-cli-service`的结构，所有代码都在`lib`和`bin`文件夹下。
`src`、`public`文件夹是为了开发工具时方便测试而存在的。

工具的原理就是根据用户的配置(seabo.config.js)和执行的命令(serve和build)，
来拼接一个`webpack.config`，并运行webpack。

## 安装

```
npm i -D seabo-cli-service
```

## 用法

#### serve

启动webpack-serve开发服务，提供了hmr, proxy等功能。

```
$ seabo-cli-service serve
```

- options
  * -p <port> 设置端口号，默认是4002
  * --host <host> 设置host，默认是0.0.0.0

#### build

进行生产环境的打包

```
$ seabo-cli-service build
```

- options
  * -w 开启webpack watch模式, 默认关闭.
  * -nocompress 关闭uglify压缩, 默认开启.

## 配置

seabo-cli-service的配置文件可以有多个。

- seabo.config.js 默认的配置文件
- seabo.config.production.js 执行seabo build时的配置文件
- seabo.config.development.js 执行seabo serve时的配置文件
- seabo.config.local.js 本地的配置文件(可以把该文件加入.gitignore)
- seabo.config.production.local.js 本地的配置文件(可以把该文件加入.gitignore), 执行seabo build时的配置文件
- seabo.config.development.local.js 本地的配置文件(可以把该文件加入.gitignore), 执行seabo serve时的配置文件

配置会根据文件的优先级进行覆盖

seabo.config.\*.local.js > seabo.config.local.js > seabo.config.\*.js > seabo.config.js


目前支持的配置有以下配置：

```js
module.exports = {
  entry: {
    app: './src/app.js'
  }

  // webpack.definePlugin的配置
  define: {},

  // babel-preset-env和autoprefixer的浏览器支持配置
  browserList: [],

  // node_modules下需要经过babel编译的模块, 默认node_modules下所有文件不会经过babel编译
  es5ImcompatibleNodeModules: [],

  // 公共资源文件夹路径
  contentDir: 'public',

  // 原生webpack的配置, seabo-cli-service内部会使用webpack-merge进行合并
  webpack: {
    output: {
      publicPath: '/',
      path: service.resolve('dist'),
      filename: 'app.[hash].js'
    },
  },

  // webpack-serve 配置
  serve: {
    host: '127.0.0.1',
    port: '4002',
  },

  // html-webpack-plugin 配置
  html: {
    template: './public/index.hbs'
  }

}
```


## TODO

- 多页的支持 (在react-dva-spa中做支持)
- pwa支持
- test


## 最后欢迎在issue和merge request提各种意见与建议
