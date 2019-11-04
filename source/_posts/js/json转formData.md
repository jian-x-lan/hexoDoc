---
title: json转formData
date: 2017-08-10 15:58:00

tags:
  - js
---

写项目以来一直写请求都是直接丢个 json 数据，天真的以为所有的 ajax 就是传 json 数据就好。直到遇到不配合的后端非让我传给他 formData 格式的数据。还一度怪人家不懂的变通，一点都不智能。其实还是自己见的太少，菜鸟遇到问题就是比较容易急躁呀。

<!--more-->

```javascript
function isObject(value) {
  return value === Object(value)
}

function isArray(value) {
  return Array.isArray(value)
}

function makeArrayKey(key) {
  if (key.length > 2 && key.lastIndexOf('[]') === key.length - 2) {
    return key
  } else {
    return key + '[]'
  }
}

/**
 * 格式化
 * @param {*} obj
 * @param {*} resultArr
 * @param {*} pre
 */
function objectToFormData(obj, resultArr, pre) {
  resultArr = resultArr || []
  Object.keys(obj).forEach(function(prop) {
    var key = pre ? pre + '.' + prop : prop
    if (isObject(obj[prop]) && !isArray(obj[prop])) {
      objectToFormData(obj[prop], resultArr, key)
    } else if (isArray(obj[prop])) {
      obj[prop].forEach(function(value, i) {
        var arrayKey = key + '[' + i + ']'
        if (isObject(value)) {
          objectToFormData(value, resultArr, arrayKey)
        } else {
          resultArr.push(arrayKey + '=' + value)
        }
      })
    } else {
      obj[prop] !== '' && obj[prop] !== null
        ? resultArr.push(key + '=' + obj[prop])
        : null
    }
  })

  return resultArr.join('&')
}
```
