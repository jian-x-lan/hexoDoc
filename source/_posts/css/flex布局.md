---
title: flex布局
date: 2018-06-28 10:37:37

tags:
  - css
---

15 年入行前端，但说来惭愧，一直到 17 年我仍然是个只会定义宽高的纯样式渣渣。后来看旁边的小姐姐用的很 6，读了阮一峰大师的博文[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool),说实话真的是一脸二脸再 N 脸蒙圈，内心觉得可能这辈子也学不会了 😭。

<!--more-->

后期在小姐姐的积极教学中，写样式的功力也慢慢从量的飞跃得到质的飞跃。但公司项目比较传统，需要兼容 IE8,所以没有用武之地依旧看了无用。后来需要重构部门内部的一个系统，不受限与浏览器版本，终于可以甩开胳膊的干活啦。

以上都是异常罗里吧嗦的背景介绍，亦可以理解为找借口。
原理啥的还是去看阮一峰大师的博文吧，我就是懒得不行的伸手党，我写例子也从来只写我遇到的情况，以及直接丢代码，这就是我懒得出奇的风格呀 😄

<hr>

#### 水平垂直居中

<style>
div{
  box-sizing:border-box;
}
.box-p1 {
  width: 200px;
  height: 100px;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  width: 50px;
  height: 50px;
  background: #333;
}
</style>
<div class="box-p1">
  <div class="box"></div>
</div>

```
.box-p1 {
  width: 200px;
  height: 100px;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  width: 50px;
  height: 50px;
  background: #333;
}
<div class="box-p1">
  <div class="box"></div>
</div>
```

#### 每个子元素两侧的间隔相等

<style>
.box-p2 {
  width: 500px;
  height: 100px;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.box {
  width: 50px;
  height: 50px;
  background: #333;
}
</style>
<div class="box-p2">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>

```
.box-p2 {
  width: 500px;
  height: 100px;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.box {
  width: 50px;
  height: 50px;
  background: #333;
}
<div class="box-p2">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>
```

#### 子元素两端对齐且间距都相等。

<style>
.box-p3 {
  width: 500px;
  height: 100px;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.box {
  width: 50px;
  height: 50px;
  background: #333;
}
</style>
<div class="box-p3">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>

```
.box-p3 {
  width: 500px;
  height: 100px;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.box {
  width: 50px;
  height: 50px;
  background: #333;
}
<div class="box-p3">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>
```

#### 等间距分隔且换行

这个需要小小的计算一下

<style>
.box-p4 {
  width: 190px;
  height: 190px;
  border: 1px solid #333;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.box-p4 .box {
  width: 50px;
  height: 50px;
  background: #333;
  margin: 5px 0;
}
</style>
<div class="box-p4">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>

```
.box-p4 {
  width: 190px;
  height: 190px;
  border: 1px solid #333;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.box-p4 .box {
  width: 50px;
  height: 50px;
  background: #333;
  margin: 5px 0;
}
<div class="box-p4">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>
```
