---
title: mxClient
date: 2018-8-23 01:00:00
tags:
  - mxGraph
---

[mxClient 文档](https://jgraph.github.io/mxgraph/docs/js-api/files/mxClient-js.html)

<!--more-->

`mxClient.js`包含了运行 `mxGraph` 所需的所有源文件，并加载了其依赖的资源文件，以及配置了客户端的语言。只要在需要使用 `mxGraph` 的地方用\<script>标签加载 `mxClient.js` 即可使用该库。

#### 作用

1. 配置路径

```javascript
// 所有文件的基本路径，默认为'.'
mxBasePath = '/xx/yy'
// 所有图片的基本路径，默认为<mxClient.basePath> + '/images'
mxImageBasePath = '/aa/bb'
```

2. 配置语言

```javascript
//设置客户端的语言
mxLanguage = 'en' //en表示英语，de表示德语。默认是en
```

#### mxClient

mxClient 定义为一个类

- 当前 mxGraph 的版本号

```
VERSION: '3.9.9'
```

- 标识客户端的浏览器和操作系统

```javascript
//浏览器
// IE浏览器
IS_IE: navigator.userAgent.indexOf('MSIE') >= 0,
IS_IE6: navigator.userAgent.indexOf('MSIE 6') >= 0,
...

//操作系统
// iPad、iPhone和iPod平台
IS_IOS: (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false),
// Windows系统
IS_WIN: navigator.appVersion.indexOf('Win') > 0,
// Mac系统
IS_MAC: navigator.appVersion.indexOf('Mac') > 0,
...

```

- 定义检查浏览器是否支持的函数

```javascript
//检查浏览器是否支持VML或者SVG，因为mxGraph的cell可以用VML或者SVG在画出来，所以必须要浏览器支持其中一种语言：
isBrowserSupported: function () {
    return mxClient.IS_VML || mxClient.IS_SVG;
},
```

- 定义加载 css 文件、js 文件和依赖资源的函数

```javascript
//加载css文件到HTML的head中，link标签的charset固定为UTF-8，type固定为text/css：

/**
 * rel：link标签的rel属性
 * href：link标签的href属性，相对路径
 * doc：可选的link标签所属的document
 */
link: function (rel, href, doc) {...}

//加载js文件到HTML的head中，这个函数只在开发环境中使用，因为在生成环境中使用的是mxClient.min.js
/**
 * src：script标签的src属性，相对路径
 */
include: function (src) {...}

//如果mxLoadResources全局变量为false，则使用该函数加载mxClient的依赖资源：
/**
 * fn：在所有资源文件加载之后调用的函数
 * lan：可选的传递给<mxResources.add>的参数
 */
loadResources: function (fn, lan) {...}
```

- 保存一些配置相关的变量，比如语言、路径等
