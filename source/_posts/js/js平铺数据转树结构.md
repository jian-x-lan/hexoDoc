---
title: js 平铺数据转层级树结构
date: 2020-01-07 09:16:37
tags:
  - js
---

经常会遇到需要将平铺的数据结构转换成父子树结构，趁着做一个’调查问卷‘的需求，将这个问题加深理解一下。

<!--more-->

```javascript
var list = [
  { id: '1', parentId: '0' },
  { id: '2', parentId: '1' },
  { id: '3', parentId: '1' },
  { id: '4', parentId: '2' },
  { id: '5', parentId: '0' }
]
```

```javascript
function transformData(list) {
  var temp = {}
  var treeArr = [],
    treeObj = {}
  for (var i in list) {
    temp[list[i].id] = list[i]
  }
  for (var i in temp) {
    if (temp[i].parentId !== '0') {
      if (!temp[temp[i].parentId].children) {
        temp[temp[i].parentId].children = []
      }
      temp[temp[i].parentId].children.push(temp[i])
    } else {
      treeObj[temp[i].id] = temp[i]
    }
  }
  for (var i in treeObj) {
    treeArr.push(treeObj[i])
  }

  return {
    treeArr: treeArr, //常规需求
    mapList: temp //做调查问卷时，这种格式更有助于渲染子集问题
  }
}

var treeData = transformData(list)
```
