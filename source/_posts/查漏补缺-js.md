---
title: 查漏补缺-js
date: 2020-01-09 09:16:37
tags:
  - js
---

[参考网址](https://github.com/haizlin/fe-interview/blob/master/category/history.md)

<!--more-->

### 统计某一字符或字符串在另一个字符串中出现的次数[2019.04.23]

### 写一个去除制表符和换行符的方法[2019.04.22]

```javascript
str.replace(/[\t\v\n]/g, '')
```

### 写一个把字符串大小写切换的方法[2019.04.21]

```javascript
function transCase1(str) {
  return str.replace(/([a-z]*)([A-Z]*)/g, function(match, $1, $2) {
    return `${$1.toUpperCase()}${$2.toLowerCase()}`
  })
}
var data = transCase1('helloWorld') //HELLOwORLD
```

```javascript
function transCase2(str) {
  var arr = str.split('')
  return arr.map(item => {
    if (item.toLowerCase() == item) {
      item.toUpperCase()
    }
    if (item.toUpperCase() == item) {
      item.toLowerCase()
    }
    return item
  })
}
var data = transCase1('helloWorld')
console.log(data)
```

### 写一个方法把下划线命名转成大驼峰命名[2019.04.20]

```javascript
//第一反应是正则，无奈我想到正则就无从下手了，先按照笨方法完成一个版本吧
function transCamle1(str) {
  var arr = str.split('_')
  return arr
    .map((item, i) => {
      return i == 0 ? item : item[0].toUpperCase() + item.substr(1)
    })
    .join('')
}
var data = transCamle1('hello_world_js') //helloWorldJs
```

```javascript
//正则
function transCamle2(str) {
  while (str.match(/\w_\w/)) {
    str = str.replace(
      /(\w)(_)(\w)/,
      (match, $1, $2, $3) => `${$1}${$3.toUpperCase()}`
    )
  }
  return str
}
var data = transCamle2('hello_world_js') //helloWorldJs
```

### 去除字符串中最后一个指定的字符[2019.04.19]

```javascript
//个人
function delLast1(str, target) {
  var arr = str.split('')
  arr.splice(str.lastIndexOf(target), 1)
  return arr.join('')
}
//delLast1('abcdaec','a')

//网友一
function delLast2(str, target) {
  let reg = new RegExp(`${target}(?=([^${target}]*)$)`)
  return str.replace(reg, '')
}
//delLast2('abcdaec','a')

//网友二
function delLast3(str, target) {
  var index = str.lastIndexOf(target)
  return str.substring(0, index) + str.substring(index + 1, str.length)
}
//delLast3('abcdaec','a')

//网友三
function delLast4(str, target) {
  return str
    .split('')
    .reverse()
    .join('')
    .replace(target, '')
    .split('')
    .reverse()
    .join('')
}
//delLast4('abcdaec','a')
```

### 去除字符串中的空格[2019.04.18]

```javascript
//法一
str.replace(/\s+/g, '')
//法二
str.split(' ').join('')

//去除两端空格
str.trim()
```

### 生成指定范围随机数[2019.04.17]

```javascript
function getRandom(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min)
}
```
