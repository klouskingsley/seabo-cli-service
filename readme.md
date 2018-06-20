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
$ ./bin/seabo-cli-service serve
```

build

```
$ ./bin/seabo-cli-service build
```


## TODO
1. postcss: 默认的postcss config处理，检测项目中是否含postcss配置，如果有就使用
2. 将public中的文件copy到编译后的dist中(index.hbs)除外
3. file-loader/url-loader检查(js中/css中)
4. 暴露seabo-cli-service serve 时 port/host的配置
