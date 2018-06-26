# seabo-cli-service

## Usage

#### build

```
$ seabo-cli-service build
```

#### dev

```
$ seabo-cli-service serve
```

## example

dev

```
$ ./bin/seabo-cli-service.js serve
```

build

```
$ ./bin/seabo-cli-service.js build
```

## TODO
~~1. postcss: 默认的postcss config处理(wyf)~~
  - 检测项目中是否含postcss配置，如果有就使用(xhw)
  - ~~css modules(wyf)~~
2. ~~将public中的文件copy到编译后的dist中(index.hbs)除外(xhw)~~
3. ~~file-loader/url-loader检查(js中/css中) (xhw)~~
5. react hot loading
6. ~~添加dva(xhw)~~
7. ~~babel plugin的完善及单独做成preset(wyf)~~
10. ~~css 单独分离(wyf)~~
11. ~~vendor 分离(xhw)~~
12. uglify-es压缩es6+时抛出错误

## TODO2

1. ~~seabo-cli-service build时的进度及loading (xhw)~~
4. ~~暴露seabo-cli-service serve 时 port/host的配置~~
8. 暴露api proxy
9. 暴露alias配置
10. definePlugin 配置、环境变量配置
13. serve/build编译时的eslint
14. serve编译时产生错误无法进行下去时，将错误栈显示到浏览器中
15. ~~serve/build 进度显示(xhw)~~
16. publicPath和baseUrl的处理
17. ~~uild之前删除dist~~
18. babel cache-loader, thread-loader

## TODO3
1. 单元测试
2. pwa
3. modern mode


## 配置

参考vue-cli的配置设计：https://github.com/vuejs/vue-docs-zh-cn/tree/master/vue-cli

- cli config

- serve
mode
host
port
https

- build
mode
dest
target
name
~~watch~~
~~nocompress~~


- config

serviceWorker 是否开启serviceWorker

dynamicImport 是否开启dynamic

outputPath/outputDir 文件输出路径 默认dist

define webpack definePlugin变量

externals webpack external属性

alias webpack alias属性

browserslist babel-preset-env和autoprefixer的browserlist属性

publicPath

devtool

proxy

es5ImcompatibleVersions/transpileDependencies node_modules下需要通过babel-loader处理的包

webpackServe

baseUrl // publicPath

pwa

productionSourceMap

html htmlwebpackPlugin配置

env NODE中process.env环境变量SEABO_APP_开头的会被definePlugin，如


vue.config.js

vue.config.[mode].js

vue.config.local.js
