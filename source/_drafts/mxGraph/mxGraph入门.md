---
title: mxGraph入门
date: 2018-08-28 10:37:37

tags:
  - mxGraph
---

从官网经典的 HelloWorld 开始学习吧！

<!--more-->

> 引入 mxGraph

```
//首先要声名一个全局变量 mxBasePath 指向一个路径，然后引入 mxGraph。
//mxBasePath 指向的路径作为 mxGraph 的静态资源路径,都是 mxGraph 运行过程中所需要的，所以要在引入 mxGraph 前先设置 mxBasePath

<script type="text/javascript">
mxBasePath = '../src';
</script>
<script type="text/javascript" src="../src/js/mxClient.js"></script>

创建主方法

function main(container) {
 if (!mxClient.isBrowserSupported()) {
 mxUtils.error('Browser is not supported!', 200, false)
 } else {
 var graph = new mxGraph(container)
 var parent = graph.getDefaultParent()
 graph.getModel().beginUpdate()
 try {
 //画图 ...
 } finally {
 graph.getModel().endUpdate()
 } }
}
//beginUpdate、endUpdate 用于创建一个事务，一次 beginUpdate 必须对应一次 endUpdate
//为了保证，假如 beginUpdate 执行失败，endUpdate 永远不会被调用，beginUpdate 一定要放到 try 块之外
//为了保证，假如 try 块内更新失败，endUpdate 也一定被调用，beginUpdate 一定要放到 finally 块 //使用 beginUpdate 与 endUpdate 可提高更新视图性能，框架内部做撤消/重做管理也需要 beginUpdate、endUpdate
```

> insertVertex 和 insertEdge

- vertex 和 edge 都是 mxCell(value, geometry, style)的实例;位置信息都是 mxGeometry(x, y, width, height) 的实例;
  vertex 是通过 setVertex(true)设置为节点;edge 是通过 setEdge(true)设置为边;最后通过 addCells 方法将元素添加到画布中
- mxGeometry(x, y, width, height)代表图形的几何信息
- relative 为 false 的节点，表示以画布左上角为基点进行定位，x、y 使用的是绝对单位 。insertVertex 默认创建 relative 为 false 的节点。
- relative 为 true 的节点，表示以父节点左上角为基点进行定位，x、y 使用的是相对单位。x、y 取值范围都是 [-1,1]
- relative 为 true 的边，x、y 用于定位 label。insertEdge 会创建一条 relative 为 true 的边。x 取值范围是 [-1,1]，-1 为起点，0 为中点，1 为终点。y 表示 label 在边的正交线上移到的距离。
