---
title: js千位分隔符
date: 2016-08-08 15:58:00

tags:
  - js
  - 正则表达式
---

有千位分隔符的需求，在网上找了好几个，结果要么是没有考虑到负数，要么是没有考虑到小数。下面这段代码算是最完美解决问题的了。

<!--more-->

```javascript
function thousandBitSeparator(num) {
  var source = num.toString().split('.') //按小数点分成2部分
  source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,')
  return source.join('.')
}
```

测试结果：
thousandBitSeparator(12345678)
**"12,345,678"**
thousandBitSeparator(12345678.1234)
**"12,345,678.1234"**
thousandBitSeparator(-12345678.1234)
**"-12,345,678.1234"**
