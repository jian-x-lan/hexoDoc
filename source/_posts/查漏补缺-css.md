---
title: 查漏补缺-css
date: 2020-01-09 09:16:37
tags:
  - css
---

[参考网址](https://github.com/haizlin/fe-interview/blob/master/category/history.md)

<!--more-->

### CSS 选择器有哪些？哪些属性可以继承？[2019.04.20]

### 隐藏元素[2019.04.19]

```css
/* 自己 */
.hidden1 {
  /* 不占位 */
  display: none;
}
.hidden2 {
  /* 占位 */
  visibility: hidden;
}
.hidden3 {
  /* 占位 */
  opacity: 0;
}
```

```css
/* 网友 */
.hidden4 {
  /* 针对性 行内元素无效 */
  width: 0;
  height: 0;
  overflow: hidden;
}
.hidden5 {
  /* 针对性 行内元素无效 */
  transform: scale(0);
}
.hidden6 {
  /* 针对性 */
  font-size: 0;
}
.hidden7 {
  /* 设置定位让元素大幅度偏离文档流,额，并不是很好的一个方案 */
  position: relative;
  margin-top: -10000px;
}
```

### CSS3 有哪些新增的特性？[2019.04.18]

### 两侧宽度固定，中间宽度自适应的三栏布局[2019.04.17]

#### 圣杯布局

```html
<style>
  body {
    min-width: 600px;
  }
  .box {
    padding: 0 200px;
  }

  .box::after {
    content: '';
    display: block;
    clear: both;
  }

  .box div {
    float: left;
  }

  .center {
    width: 100%;
    background: #e1e1e1;
  }

  .left {
    width: 200px;
    background: goldenrod;
    margin-left: -100%;
    /* 使用position: relative和right: 200px将元素的位置在原有位置基础上左移200px */
    position: relative;
    right: 200px;
  }

  .right {
    width: 200px;
    background: rosybrown;
    margin-right: -200px;
  }
</style>
<div class="box">
  <div class="center">center</div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```

#### 双飞翼布局

```html
<style>
  body {
    min-width: 600px;
  }

  .box {
    width: 100%;
  }

  .column {
    float: left;
  }

  .center {
    margin-left: 200px;
    margin-right: 200px;
  }

  .left {
    width: 200px;
    margin-left: -100%;
    background: #e1e1e1;
  }

  .right {
    width: 200px;
    margin-left: -200px;
    background: #e1e1e1;
  }
</style>
<div class="box column">
  <div class="center">center</div>
</div>
<div class="left column">left</div>
<div class="right column">right</div>
```

#### 绝对定位

```html
<style>
  .box {
    width: 100%;
    height: 100px;
    position: relative;
  }

  .box .left {
    width: 200px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: #e1e1e1;
  }

  .box .right {
    width: 200px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background: #e1e1e1;
  }

  .box .center {
    width: auto;
    background: #fff;
    margin: 0 200px;
  }
</style>

<div class="box">
  <div class="center">center</div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```

#### flex 布局

`flex`:flex-grow flex-shrink flex-basis;默认为 `0 1 auto`
两个快捷值:`auto` (1 1 auto) 和 `none` (0 0 auto)。

```html
<style>
  .box {
    display: flex;
  }

  .center {
    flex: 1;
  }

  .left {
    flex: 0 0 200px;
    order: -1;
    background: #f1f1f1;
  }

  .right {
    flex: 0 0 200px;
    background: #f1f1f1;
  }
</style>
<div class="box">
  <div class="center">center</div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```
