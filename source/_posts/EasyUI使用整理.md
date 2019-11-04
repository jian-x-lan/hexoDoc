---
title: EasyUI 使用整理
date: 2019-09-09 09:16:37
tags:
  - js
  - jquery
---

[官网地址](http://www.jeasyui.net/)

<!--more-->

<!-- #### 数据表格 -->

#### 修改分页的配置

![啦啦](/images/easyui-pagination.png?width=10)

1. 单个表格的分页解决方案

```javascript
var pager = $('#pageTable').datagrid('getPager')
pager.pagination({
  pageSize: 5,
  layout: ['info', 'prev', 'links', 'next'],
  displayMsg: '共{total}个'
})
```

2. 使用 easyloader 全局配置

```javascript
//修改 easyloader.sea.js 的 moduleInits
'moduleInits': {
  ...
  'pagination': function () {
    $.fn.pagination.defaults.layout = ['info', 'prev', 'links', 'next'];
    $.fn.pagination.defaults.displayMsg = '共{total}条';
  }
}

```

#### filebox 获取文件信息

在组件`onChange`事件中默认参数是文件名,需要通过 this 获取文件信息
![啦啦](/images/easyui-filebox.png)

```javascript

<input id="importFile" type="text" name="importFile">

$('#importFile').filebox({
  height: 40,
  buttonText: '添加文件',
  buttonAlign: 'center',//官网只有'left'和'right'两个配置属性,'center'神奇的可以达到图示效果,对优化样式很友好
  onChange: function (fileName) {
    importFile = $(this).context.ownerDocument.activeElement.files[0]
  }
})

```

#### combobox 实现级联

主要是在`onSelect`方法中加载下一个下拉框的数据

```javascript
<input id="prov" name="prov" value="" />
<input id="city" name="city" value="" />

$('#prov').combobox({
  // url:'combobox_data.json',//url请求
  valueField: 'id',
  textField: 'text',
  prompt: '请选择',
  editable: false,
  onLoadSuccess: function () {
    //加载完成后,设置选中第一项
    var val = $(this).combobox('getData')
    $(this).combobox('select', val[0].text)
  },
  onSelect: function (selectedProv) {
    // 方式一:请求地市数据并渲染地市组件
    // var getCidyDataUrl = 'xxx'
    // $('#city').combobox('reload', getCidyDataUrl)

    // 方式二:本地渲染方式
    var cityData = [...]
    $('#city').combobox('loadData', cityData)
  }
})
$('#city').combobox({
  valueField: 'id',
  textField: 'text',
  editable: false,
  prompt: '请选择'
})

```

#### datagrid 单选

- 一般情况下如果不是很注重 UI,设置`singleSelect:true`即可,但是行选择显示的是 checkbox 框，表头有全选框，功能可以实现，但交互总是给人误导。

```javascript
$('#pageTable').datagrid({
  ...
  singleSelect:true,
  columns:[[
    {
      field: 'ck',
      checkbox: true,
      width:  50
    }
    ....
  ]]
})
```

- 如果需要显示 radio,则需要自定义,核心如下,点击事件 `onClickRow` 实现交互

```javascript
$('#pageTable').datagrid({
  ...
  columns:[[
    {
      field: 'radio',
      width:  50,
      title: '选择',
      formatter: function (value, row, index) {
        return '<input type="radio" name="table-radio"/>'
      }
    }
    ....
  ]],
  // 单行点击勾选radio框
  onClickRow: function (rowIndex, rowData) {
    $("input[name='table-radio']")[rowIndex].checked = true;
    ...
  }
})
```

- 但是想触发选中事件，没有找到好的解决方案，研究了下面的方法，核心还是利用原先的 `checkbox`

```javascript
var selectRowIndex=0;
//使用一个隐藏的checkbox，通过触发onCheck事件实现交互
$('#pageTable').datagrid({
  ...
  url:'xxx',
  queryParams:{...},
  singleSelect: true,
  columns:[[
    {
      field: 'ck',
      checkbox: true,
      hidden: true
    },
    {
      field: 'radio',
      width:  50,
      title: '选择',
      formatter: function (value, row, index) {
        return '<input type="radio" name="table-radio"/>'
      }
    }
    ....
  ]],
  // check单行点击勾选radio框,
  onCheck: function (rowIndex, rowData) {
    $("input[name='table-radio']")[rowIndex].checked = true;
    selectRowIndex=rowIndex;
    ...
  }
})
// 至此上面是可以完成基本的单选功能
// 我遇到的需求是一些列操作后刷新表格仍然勾选之前选中的行
// 如果是静态表格
 $('#pageTable').datagrid('load', {...})
 $('#pageTable').datagrid('checkRow', selectRowIndex)
//但是异步表格，设置checkRow的时候可能radio还没有被渲染出来，所以我折中使用了一个笨的方法
var tableOptions = $('#pageTable').datagrid('options');
tableOptions.queryParams = {...}
tableOptions.onLoadSuccess = function () {
    $('#pageTable').datagrid('checkRow', selectRowIndex);
}
$('#pageTable').datagrid(tableOptions)
```
