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
1. postcss: 默认的postcss config处理，检测项目中是否含postcss配置，如果有就使用
  - css modules
2. 将public中的文件copy到编译后的dist中(index.hbs)除外
3. file-loader/url-loader检查(js中/css中)
5. react hot loading
6. 添加dva
7. babel plugin的完善及单独做成preset
10. css 单独分离
11. vendor 分离

## TODO2

1. seabo-cli-service build时的进度及loading
4. 暴露seabo-cli-service serve 时 port/host的配置
8. 暴露api proxy
9. 暴露alias配置
