---
title: mxGraph实践(一)
date: 2018-08-28 10:37:37

tags:
  - mxGraph
---

工作需要使用 mxGraph 绘制流程图。旧系统使用 0.99.0.7 版本，最新版本 3.9.12。并且是融入 vue 项目。摸索中前行。首先，我下载了官方例子，每个例子都运行一遍，按照功能分类整理。其次，根据新系统设计图，统计功能点，再去研究旧系统，看使用方法。大概有个数。

<!--more-->

> 参考地址

- [API](http://jgraph.github.io/mxgraph/docs/js-api/files/index-txt.html)
- [在线例子](https://jgraph.github.io/mxgraph/javascript/index.html)
- [github 地址](https://github.com/jgraph/mxgraph)

> 功能点、遇到的问题及解决方法

1. 因为是 vue 项目中使用，我网上搜索，没有得到什么有效信息。npm 引入的方式无效，只好按照静态文件的方式引入。

- 下载[源码](https://github.com/jgraph/mxgraph/tree/master/javascript/src),放入项目 static 目录中。
- index.html 中引入,文件路径与 webpack 配置 assetsSubDirectory、assetsPublicPath 有关。

```
//config/index.js
...
dev: {
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/bpm_web_app',
    ...
}
...
build: {
    ...
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/bpm_web_app/',
    ...
}
...


//index.html
...
<body>
    <div id="app"></div>
    <script>
      mxBasePath = '/bpm_web_app/assets/src';
    </script>
    <script src="/bpm_web_app/assets/src/js/mxClient.js"></script>
</body>
...
```

2. 新建 vue 文件，初始化模板如下

```
<template>
    <div id="graph"></div>
</template>
<script>
export default {
    data() {
        return{
            graph:null
        }
    },
    mounted() {
        this.main(document.getElementById("graph"));
    },
    methods:{
        main(container){
            let self = this;
            if (!mxClient.isBrowserSupported()) {
                mxUtils.error("Browser is not supported!", 200, false);
            } else {
                self.graph = new mxGraph(container)
                // 启动更新事务
                self.graph.getModel().beginUpdate();
                try {
                    //具体绘制代码
                } finally {
                    self.graph.getModel().endUpdate();
                }
            }
        }

    }
}
</script>
```

3. 修改默认样式

- 关键属性[mxConstants](https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxConstants-js.html#mxConstants)

```
setDefaultStyle() {
    let self = this;
    //节点样式
    let vertexStyle=self.graph.getStylesheet().getDefaultVertexStyle();
    vertexStyle[mxConstants.STYLE_SHAPE]=mxConstants.SHAPE_IMAGE;
    vertexStyle[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_MIDDLE;
    vertexStyle[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
    vertexStyle[mxConstants.STYLE_FONTCOLOR] = "#000";
    //连接线样式
    let edgeStyle=self.graph.getStylesheet().getDefaultEdgeStyle();
    edgeStyle[mxConstants.STYLE_STARTARROW]=mxConstants.ARROW_OVAL;
    edgeStyle[mxConstants.STYLE_STROKECOLOR] ="#666";
    edgeStyle[mxConstants.STYLE_DASHED] = true; //设置虚线
},
```

4. mxEditor 配置节点属性

- 使用

```
//1⃣️官网使用如下方法获取mxEditor配置信息，但实践无效，未深究。
️let root = mxUtils.load('config/graphConfig.xml').getDocumentElement();


//2⃣我将配置信息存储到js中,然后通过以下方式获取并配置。
import { graphConfig } from "@/assets/utils/graphConfig";


let root = mxUtils.parseXml(graphConfig).documentElement;


self.editor = new mxEditor(root);
self.graph = new mxGraph(container,self.editor.graph.model);
```

- mxEditor 配置如下，templates 中配置节点和连线的基础结构，可包含属性和样式。在拖拽方法中通过 self.editor.templates["xxx"]获取。

```
<?xml version="1.0" encoding="UTF-8"?>
<mxEditor defaultGroup="group" defaultEdge="connector">
	<Array as="templates">
	    <!--连线设置-->
		<add as="connector">
			<Connector  href="" cellType='connector' lineName=''  lineLeftValue='' lineOperator='' lineRightValue=''>
				<mxCell style="straight;strokeWidth=0.5" >
					<mxGeometry as="geometry" relative="1" />
				</mxCell>
			</Connector>
		</add>
		<!--节点设置-->
		<add as="start">
			<Roundrect  href="" cellType='start' activityId='start' activityName='开始'>
				<mxCell vertex="1" style="rounded">

					<mxGeometry as="geometry" width="32" height="32"/>
				</mxCell>
			</Roundrect>
		</add>
		...
	</Array>
	<mxGraph as="graph" alternateEdgeStyle="verticalConnector" allowLoops="1" dropEnabled="1">
		<mxGraphModel as="model">
			<root>
				<Diagram processName="My Process">
					<mxCell/>
				</Diagram>
				<Layer processId="Default Layer" id="1">
					<mxCell parent="0"/>
				</Layer>
			</root>
		</mxGraphModel>
	</mxGraph>
</mxEditor>
```

5. 我遇到的第一问题便是拖拽自定义图标。

- [核心方法 makeDraggable](https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxUtils-js.html#mxUtils.makeDraggable)function( element,graphF,funct,dragElement,dx,dy,autoscroll,scalePreview,highlightDropTargets,getDropTarget)
- mxGraph 中节点设置属性，该节点只可以是 xml 格式，所以初始版本我创建 xml 节点并设置属性

```
let dragFunct = function(graph, evt, target, x, y) {
    var doc = mxUtils.createXmlDocument();

    var cell = doc.createElement(type);
    cell.setAttribute("name", title);
    cell.setAttribute("type", type);
    cell.setAttribute("dragId", dragId);
    self.graph.insertVertex(
        self.processData ? graph.getDefaultParent() : self.parent,
        null,
        cell,
        x,
        y,
        40,
        40,
        "image=" + require("@/assets/images/" + dragId + ".png") + ";"
    );
};
```

- 但是创建 xml 节点的方式貌似并不适用于创建连接线，因为连接线需要设置起止点坐标。多方研究后，采取 mxEditor 配置的方式，同时修改节点拖拽

```
let dragFunct = function(graph, evt, target, x, y) {
    if (type == "line") {
      var cell = self.editor.templates["connector"];
      //设置连线起止点相对坐标
      cell.geometry.setTerminalPoint(new mxPoint(0, 50), true);
      cell.geometry.setTerminalPoint(new mxPoint(50, 0), false);
      cell.edge = true;
    } else {
      var cell = self.editor.templates[type];
      cell.setStyle(
        "image=" +
          require("@/assets/images/" + imgMap[`${type}`] + "-finish.png") +
          ";"
      );
      cell.vertex = true;
    }
    let cells = graph.importCells([cell], x, y, target);
    if (cells != null && cells.length > 0) {
      self.graph.scrollCellToVisible(cells[0]);
      self.graph.setSelectionCells(cells);
    }
};
```

- 完整代码如下

```
//设置图标拖拽
setDragItem(title, type) {
      let self = this;
      //拖拽图标源
      let img = document.getElementById('icon');
      if (mxClient.IS_IE) {
        mxEvent.addListener(img, "dragstart", function(evt) {
          evt.returnValue = false;
        });
      }
      let graphF = function(evt) {
        let x = mxEvent.getClientX(evt);
        let y = mxEvent.getClientY(evt);
        let elt = document.elementFromPoint(x, y);
        if (mxUtils.isAncestorNode(self.graph.container, elt)) {
          return self.graph;
        }
        return null;
      };
      let dragFunct = function(graph, evt, target, x, y) {
        if (type == "line") {
          var cell = self.editor.templates["connector"];
          //设置连线起止点相对坐标
          cell.geometry.setTerminalPoint(new mxPoint(0, 50), true);
          cell.geometry.setTerminalPoint(new mxPoint(50, 0), false);
          cell.edge = true;
        } else {
          var cell = self.editor.templates[type];
          cell.setStyle(
            "image=" +
              require("@/assets/images/" + imgMap[`${type}`] + "-finish.png") +
              ";"
          );
          cell.vertex = true;
        }
        let cells = graph.importCells([cell], x, y, target);
        if (cells != null && cells.length > 0) {
          self.graph.scrollCellToVisible(cells[0]);
          self.graph.setSelectionCells(cells);
        }
      };
      //拖拽时的图形
      let dragElt = document.getElementById(icon);
      mxUtils.makeDraggable(
        img,
        self.graph,
        dragFunct,
        dragElt,
        0,
        0,
        self.graph.autoscroll,
        true
      );
    },
```

> 总结

- mxGraph 是第一次使用，虽然是很成熟的一个工具库，但网上资源不是很多，API 文档又是纯英文。很多时候很小的一个功能点需要纠结好久，连搜索都无从下手，只能一遍一遍的看官方 API 文档。
- 绝大多部分，是为了完成需求实现功能，也无法将代码研究透，停留在会用的基础上。
- 尽可能直接分享可用的代码段，理论知识我自个儿也还一知半解。

> 前言

- mxGraph 小结(一)中介绍了 vue 项目中使用 mxGraph 的流程及拖拽功能的实现。细节功能点因篇幅较长，所以本篇重点罗列。

* 获取图表对应 xml

```
getXmlCode() {
  let self = this;
  let enc = new mxCodec(mxUtils.createXmlDocument());
  let node = enc.encode(self.graph.getModel());
  self.xmlCode = mxUtils.getPrettyXml(node);
},
```

- 根据 xml 数据渲染图表

```
let node = mxUtils.parseXml(self.graphData);
let root = node.documentElement;
let decoder = new mxCodec(node);
decoder.decode(root, self.graph.getModel());
```

- 关于编辑状态

```
//可连接
self.graph.setConnectable(true);
// 设置节点不可改变大小
self.graph.setCellsResizable(false);
//设置节点不可编辑
self.graph.setCellsEditable(false);
```

- 连接自己

```
self.graph.connectionHandler.setCreateTarget(true);
```

- 小图预览

```
new mxOutline(self.graph,document.getElementById("mxOutline")
```

- mxUndoManager:撤销操作

```
var history = new mxUndoManager();
var listener = function(sender, evt)
{
	history.undoableEditHappened(evt.getProperty('edit'));
};
graph.getModel().addListener(mxEvent.UNDO, listener);
graph.getView().addListener(mxEvent.UNDO, listener);
```

- 设置快捷键

```
let keyHandler = new mxKeyHandler(graph);
keyHandler.bindKey(38, function() {//设置向上按钮放大图表
   graph.zoomIn();
});
```

- 设置悬浮时连接箭头图标

```
mxConnectionHandler.prototype.connectImage = new mxImage(require("@/assets/images/connector.gif"),20,20);
```

- 悬浮高亮外框

```
new mxCellTracker(self.graph, "#00FF00");
```

​
