---
title: mxResources
date: 2018-8-23 03:00:00
tags:
  - mxGraph
---

[mxResources 文档](https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxResources-js.html)

<!--more-->

> 主要功能是实现国际化

1. 文件格式

```javascript
//比如graph_zh.txt：
文件名：name[_en].properties

//以#开头的行是注释行
//资源文件中的项是key=value的格式，值可能会通过get方法获取，
//没有等号的项会被忽略，
# 这是注释
alreadyConnected=节点已经连接
这一行将被忽略
```
