---
title: css实现等间距分布
date: 2019-8-22 09:16:37
tags:
  - css
---

被元素划分等间距区间，如图所示
![啦啦](/images/css-split3.png?width=100)

```html
//dom 元素如下
<div class="box">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>
```

收集了如下三种解决方案

1. `space-evenly`,注意点是这个属性的兼容性

```css
.box {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  background: #f5f5f5;
}
.item {
  width: 40px;
  height: 40px;
  background: #333;
  border-radius: 50%;
}
```

2. `flex` 和 `calc` 结合

```css
.box {
  width: 100%;
  display: flex;
  background: #f5f5f5;
}

.item {
  width: 40px;
  height: 40px;
  background: #333;
  border-radius: 50%;
  flex: 0 0 40px;
  margin-left: calc((100% - 120px) / 4);
}
```

3. 伪类

```css
.box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #f5f5f5;
}
.item {
  width: 40px;
  height: 40px;
  background: #333;
  border-radius: 50%;
}
.box:before {
  content: '';
  display: block;
}
.box:after {
  content: '';
  display: block;
}
```
