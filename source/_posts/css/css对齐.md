---
title: css对齐
date: 2019-06-28 10:37:37

tags:
  - css
---

css 实现水平垂直居中应该是最常遇到的基础面试题之一了。依旧不追求大而全，直接上例子和代码咯~

<!--more-->

### 文本

`注意点`就是标签需要是块元素，不然宽高设置不起作用~

<style>
p[class^='text'] {
  width: 400px;
  font-size: 14px;
  height: 50px;
  color: #333;
  border: 1px solid #333;
  box-sizing: border-box;
  margin: 10px;
}
.text1 {
  text-align: center;
}
.text2 {
  line-height: 50px;
}
.text3 {
  text-align: center;
  line-height: 50px;
}
</style>
<p class="text1">css文本水平居中text-align: center;</p>
<p class="text2">css文本垂直居中line-height:height;</p>
<p class="text3">css文本水平垂直居中</p>

```
<style>
p {
  width: 500px;
  font-size: 14px;
  height: 50px;
  color: #333;
  border: 1px solid #333;
}
.text1 {
  text-align: center;
}
.text2 {
  line-height: 50px;
}
.text3 {
  text-align: center;
  line-height: 50px;
}
</style>
<p class="text1">css文本水平居中text-align: center;</p>
<p class="text2">css文本垂直居中line-height:height;</p>
<p class="text3">css文本水平垂直居中</p>
```

### 内容块

#### 水平居中

<style>
.box-p1 {
  width: 200px;
  height: 100px;
  border: 1px solid #333;
}
.box-p1 .box-c {
  width: 50px;
  height: 50px;
  background: #333;
  margin: 0 auto;
}
</style>
<div class="box-p1">
  <div class="box-c"></div>
</div>

```
.box-p1 {
  width: 200px;
  height: 100px;
  border: 1px solid #333;
}
.box-p1 .box-c {
  width: 50px;
  height: 50px;
  background: #333;
  margin: 0 auto;
}
<div class="box-p1">
  <div class="box-c"></div>
</div>
```

#### 垂直居中

##### 定位(需知宽高)

<style>
.box-p2 {
  width: 200px;
  height: 100px;
  border: 1px solid #333;
  position: relative;
}
.box-p2 .box-c {
  width: 50px;
  height: 50px;
  background: #333;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -25px; /* - height/2 */
  margin-left: -25px; /* - width/2 */
}
</style>
<div class="box-p2">
  <div class="box-c"></div>
</div>
```
.box-p2 {
  width: 200px;
  height: 100px;
  border: 1px solid #333;
  position: relative;
}
.box-p2 .box-c {
  width: 50px;
  height: 50px;
  background: #333;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -25px; /* - height/2 */
  margin-left: -25px; /* - width/2 */
}
<div class="box-p2">
  <div class="box-c"></div>
</div>
```

##### flex(无需定宽高)

<style>
.box-p3 {
  width: 200px;
  height: 100px;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<div class="box-p3">
  <div class="box-c">flex居中，无需定宽高</div>
</div>
```
.box-p3 {
  width: 200px;
  height: 100px;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
}
<div class="box-p3">
  <div class="box-c">flex居中，无需定宽高</div>
</div>
```

##### 兼容版本(无需定宽高)

<style>
.box-p4 {
  width: 200px;
  height: 100px;
  border: 1px solid #333;
  color: #333;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
</style>
<div class="box-p4">
  <div class="box-c">兼容版本,无需定宽高</div>
</div>
```
.box-p4 {
  width: 200px;
  height: 100px;
  border: 1px solid #333;
  color: #333;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
<div class="box-p4">
  <div class="box-c">兼容版本,无需定宽高</div>
</div>
```
