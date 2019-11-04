---
title: mxEventSource、mxEventObject
date: 2018-8-23 04:00:00
tags:
  - mxGraph
---

[mxEventSource 文档](https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxEventSource-js.html)
[mxEventObject 文档](https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxEventObject-js.html)

<!--more-->

### mxEventSource

`mxEventSource`是分派命名事件的对象的基类，已有如下子类：`mxGraphModel`，`mxGraph`，`mxGraphView`，`mxEditor`，`mxCellOverlay`，`mxToolbar`，`mxWindow`。

#### 构造函数

`mxEventSource` 的构造函数如下，可以指定一个事件源：

```javascript
function mxEventSource(eventSource) {
  this.setEventSource(eventSource)
}
```

采用原型链方式继承，如下所示：

```javascript
function MyClass() {}
MyClass.prototype = new mxEventSource()
MyClass.prototype.constructor = MyClass
```

#### 原型属性

```javascript
// 在数组中保存事件名称和关联的监听器。该数组包含事件名称，其后跟着每个已注册监听器的相应监听器。
mxEventSource.prototype.eventListeners = null

// 指定是否可以触发事件。默认为true。
mxEventSource.prototype.eventsEnabled = true

// 事件的可选来源。默认值为null。
mxEventSource.prototype.eventSource = null
```

#### 原型方法

```javascript
//分别用于添加、移除和触发监听器
mxEventSource.prototype.addListener = function(name, funct) {}
mxEventSource.prototype.removeListener = function(funct) {}
mxEventSource.prototype.fireEvent = function(evt, sender) {}
```

### mxEventObject

单个事件的所有属性的包装器,提供了触发事件的功能，并检查它是否被触发。

#### 构造函数

```javascript
function mxEventObject(name) {
  this.name = name
  this.properties = []

  for (var i = 1; i < arguments.length; i += 2) {
    if (arguments[i + 1] != null) {
      this.properties[arguments[i]] = arguments[i + 1]
    }
  }
}
```

#### 原型属性

```javascript
// 事件名
mxEventObject.prototype.name = null
// 将属性保存为关联数组
mxEventObject.prototype.properties = null
// 触发状态。默认值为false
mxEventObject.prototype.consumed = false
```

#### 原型方法

```javascript
/**
 * 返回给定键的属性。
 */
mxEventObject.prototype.getProperty = function(key) {
  return this.properties[key]
}
/**
 * 如果事件已触发，则返回true。
 */
mxEventObject.prototype.isConsumed = function() {
  return this.consumed
}
/**
 * 触发事件
 */
mxEventObject.prototype.consume = function() {
  this.consumed = true
}
```
