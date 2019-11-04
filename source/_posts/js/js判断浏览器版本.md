---
title: js判断浏览器版本
date: 2018-08-07 15:58:00

tags:
  - js
---

[参考链接](https://www.cnblogs.com/XCWebLTE/archive/2017/06/15/7017338.html)在网上找到的一个比较好的例子，直接上代码吧。

<!--more-->

```javascript
function IEVersion() {
  var userAgent = navigator.userAgent //取得浏览器的userAgent字符串
  var isIE =
    userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf('Edge') > -1 && !isIE //判断是否IE的Edge浏览器
  var isIE11 =
    userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    var fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion == 7) {
      return 7
    } else if (fIEVersion == 8) {
      return 8
    } else if (fIEVersion == 9) {
      return 9
    } else if (fIEVersion == 10) {
      return 10
    } else {
      return 6 //IE版本<=7
    }
  } else if (isEdge) {
    return 'edge' //edge
  } else if (isIE11) {
    return 11 //IE11
  } else {
    return -1 //不是ie浏览器
  }
}
```

- IEVersion()返回值说明：

| 值     | 值类型 | 值说明            |
| ------ | ------ | ----------------- |
| -1     | Number | 不是 ie 浏览器    |
| 6      | Number | ie 版本<=6        |
| 7      | Number | ie7               |
| 8      | Number | ie8               |
| 9      | Number | ie9               |
| 10     | Number | ie10              |
| 11     | Number | ie11              |
| 'edge' | String | ie 的 edge 浏览器 |
