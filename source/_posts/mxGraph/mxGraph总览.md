---
title: mxGraph总览
date: 2018-08-23 00:00:00

tags:
  - mxGraph
---

> 总览

`mxGraph` 库分为 8 个包。`mxClient` 类包括其他所有内容。当前版本存储在 `mxClient.VERSION` 中。

`editor` 包提供实现图编辑器所需的类。这个包中的主要类是 `mxEditor`。

`view` 和 `model` 包实现了由 `mxgraph` 表示的图形组件。指的是包含 `mxCells` 并在 `mxGraphView` 中缓存单元格状态的 `mxGraphModel。根据` `mxStylesheet` 中定义的外观，使用 `mxCellRenderer` 绘制单元格。撤消历史记录在 `mxUndoManager` 中实现。要在图形上显示图标，可以使用 `mxCellOverlay。验证规则是用` `mxMultiplicity` 定义的。

`handler`、`layout` 和 `shape` 包含事件侦听器、布局算法和形状。图形事件监听器包括用于选择的 `mxRubberBand、用于工具提示的` `mxToolTipHandler` 和用于基本单元修改的 `mxGraphHandler`。`mxCompactTreeLayout` 实现了一种树布局算法，并且形状包提供了各种形状，这些形状是 `mxShape` 的子类。

util 包提供实用程序类，包括用于复制粘贴的 `mxClipboard`、`mxDataTransfer` 用于拖放、用于样式表的键和值的 `mxConstants`、用于跨浏览器事件处理和通用函数的 `mxEvent` 和 `mxUtils`、用于国际化的 `mxResources` 和用于控制台输出的 mxLog。

`io` 包实现了 `mxObjectCodec` 用于将 javascript 对象转换为 XML，主要类是 `mxCodec`。`mxCodeRegistry` 是自定义编解码器的全局注册表。

<!--more-->

> 事件

有三种不同类型的事件，即本地 DOM 事件、在 `mxEventSource` 中激发的 `mxEventObjects` 和在 mxGraph 中激发的 `mxMouseEvents。`

- mxEvent 中提供了一些用于处理本机事件的帮助程序方法。它还负责解决 dom 节点和 javascript 事件处理程序之间的循环，这可能导致 IE6 内存泄漏。
- mxGraph 中的大多数自定义事件都是使用 `mxEventSource` 实现的。它的侦听器是接收发送者和 `mxEventObject` 的函数。此外，mxGraph 类会触发特殊的 `mxMouseEvents，这些事件是使用鼠标监听器处理的，鼠标监听器是提供` mousedown、mousemove 和 mouseup 方法的对象。
- `mxEventSource` 中的事件是使用 `mxEventSource.fireEvent` 激发的。使用 `mxEventSource.addListener` 和 `mxEventSource.removeListener` 添加和删除侦听器。mxGraph 中的 mxMouseEvents 使用 `mGgraph.fireMouseEvent` 激发。分别使用 mxGraph.addMouseListener 和 mxGraph.removeMouseListener 添加和删除侦听器。

> Key 绑定

以下键绑定是为客户端中所有浏览器和平台上的鼠标事件定义的：

- Control-Drag：复制（克隆）选定的单元格
- Shift-Rightlick：显示上下文菜单
- Alt-Click：强制选中
- Control-Select：切换选择状态
- Shift-Drag：将偏移限制为一个方向
- Shift-Control-Drag：平移（也可以移动右拖动）

> 配置

在加载客户端分别指定其语言或基路径之前定义以下全局变量

- mxBasePath: 指定路径 mxClient.basePath.
- mxImageBasePath: 指定路径 mxClient.imageBasePath.
- mxLanguage: 指定资源的语言 mxClient.language.
- mxDefaultLanguage: 指定默认语言 mxClient.defaultLanguage.
- mxLoadResources: 指定是否应加载任何资源。默认 true.
- mxLoadStylesheets: 指定是否应加载任何样式表。默认 true.

> 保留字

- mxObjectId: If the object is used with mxObjectIdentity
- as: If the object is a field of another object
- id: If the object is an idref in a codec
- mxListenerList: Added to DOM nodes when used with mxEvent
- window.mxDynamicCode: Temporarily used to load code in Safari and Chrome (see mxClient.include).
- mxJavaScriptExpression: Global variable that is temporarily used to evaluate code in Safari, Opera, Firefox 3 and IE (see mxUtils.eval).

> 文件

所有文件名都是相对于 mxClient.basePath 的。

> 内置图像

所有图像都是从 mxClient.imageBasePath 加载的，可以更改它来反映环境。图像变量也可以单独更改。

- mxGraph.prototype.collapsedImage
- mxGraph.prototype.expandedImage
- mxGraph.prototype.warningImage
- mxWindow.prototype.closeImage
- mxWindow.prototype.minimizeImage
- mxWindow.prototype.normalizeImage
- mxWindow.prototype.maximizeImage
- mxWindow.prototype.resizeImage
- mxPopupMenu.prototype.submenuImage
- mxUtils.errorImage
- mxConstraintHandler.prototype.pointImage
- mxGraph.setCellWarning 中使用的警告图片的 basename 在 mxGraph.warningImage 中定义

> 资源

mxEditor 和 mxGraph 在类加载时向 mxResources 添加以下资源:

```
resources/editor\*.properties
resources/graph\*.properties
```

默认情况下，库附带英语和德语资源文件。

> 图片

使用图像的建议:在 HTML 元素（如工具栏和上下文菜单）中使用 GIF 图像（256 调色板），在图形组件中显示的所有图像中使用 PNG 图像（24 位）。

对于 HTML 元素中的 PNG 图像，Internet Explorer 将忽略任何透明度信息。

对于图形中的 GIF 图像，Mac 上的 Firefox 将显示奇怪的颜色。此外，Mac 上只显示动画 gif 的第一张图像。

为了在应用程序运行时更快地呈现图像，可以使用以下代码预取图像

```
var image = new Image(); image.src = url_to_image;
```

> 部署

```
<script type="text/javascript" src="js/mxClient.js"></script>
```

> 源代码

必须更改 html 页面中的 mxclient.js 以引用未压缩的 mxclient.js。

> 压缩

...

> 类

mxGraph 中有两种类型的“类”：类和单例（其中只有一个实例）。单例映射到全局对象，其中变量名等于类名。例如，mxConstants 是一个对象，所有常量都定义为对象字段。普通类被映射到一个构造函数函数和一个定义实例字段和方法的原型。例如，mxEditor 是一个函数，mxEditor.prototype 是 mxEditor 函数创建的对象的原型。mx 前缀是一种约定，用于 mxGraph 包中的所有类，以避免与全局命名空间中的其他对象发生冲突。

> 子类

对于子类，父类必须提供一个无参数的构造函数或不带参数的调用。此外，在扩展原型之后，必须重新定义特殊的构造函数字段。

例如

```
mxEditor.prototype = new mxEventSource();
mxEditor.prototype.constructor = mxEditor;
```

> 构造函数

对于 mxGraph 类的子类，首先必须为新类定义一个构造函数。构造函数使用 mxGraph 函数对象上的调用函数调用超级构造函数，并明确传递每个参数：

```
function MyGraph(container){
 mxGraph.call(this, container);
}
MyGraph.prototype = new mxGraph();
MyGraph.prototype.constructor = MyGraph;
```

可能希望在上述代码之后定义与类关联的 codec,此代码将在类加载时执行，并确保使用相同的编解码器对 MXgraph 和 Mygraph 的实例进行编码。

> 方法

在 myGraph 原型中，mxGraph 的函数可以扩展如下:

```
MyGraph.prototype.isCellSelectable = function(cell){
var selectable = mxGraph.prototype.isSelectable.apply(this, arguments);
var geo = this.model.getGeometry(cell);
 return selectable && (geo == null || !geo.relative);
}
```

> 变量

一个新字段的声明和定义如下：

```
MyGraph.prototype.myField = 'Hello, World!';
myGraph 的所有实例共享相同的值。如果需要特定于实例的值，则必须在构造函数中定义该字段。
function MyGraph(container){
 mxGraph.call(this, container);
this.myField = new Array();
}
```

使用以下代码创建 `mygraph` 的新实例，其中 `container` 是充当图表视图容器的 dom 节点

```
var graph = new MyGraph(container);
```
