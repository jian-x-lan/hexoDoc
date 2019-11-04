---
title: css实现基本图形
date: 2019-08-28 10:37:37

tags:
  - css
---

日常开发经常会遇到小箭头之类的设计，以往是截小图片，现在大多采用 iconfont 字体图标。然后我网上搜索了一下，发现[张鑫旭](https://www.zhangxinxu.com/wordpress/2019/01/pure-css-shapes/)年初发布了一篇整理，内容比较全面 💜。
现在这篇记录了我经常遇到的以及我的处理方式,不断学习 ing🆙
我的风格就是直接上代码段啦。

<!-- more -->

#### 三角形

<style>
.trangle {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-left-color: #333;
}
</style>
<div class="trangle"></div>
```
<style>
.trangle {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-left-color: #333;
}
</style>
<div class="trangle"></div>
```

#### 箭头

<style>
.arrow {
  position: relative;
  height: 20px;
}
.arrow:before,
.arrow:after {
  position: absolute;
  content: '';
  border: 10px solid transparent;
  border-left-color: #fff;
}
.arrow:before {
  left: 2px;
  border-left-color: #333;
}
</style>
<div class="arrow"></div>
```
<style>
.arrow {
  position: relative;
  height: 20px;
}
.arrow:before,
.arrow:after {
  position: absolute;
  content: '';
  border: 10px solid transparent;
  border-left-color: #fff;
}
.arrow:before {
  left: 2px;
  border-left-color: #333;
}
</style>
<div class="arrow"></div>
```

#### 圆环

<style>
.ring1 {
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  border: 5px solid #eee;
}
</style>
<div class="ring1"></div>
```
<style>
.ring1 {
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  border: 5px solid #eee; 
}
</style>
<div class="ring1"></div>
```
#### 渐变圆环

<style>
.ring2 {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid transparent;
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-size: cover;
  box-sizing: border-box;
  background-image: linear-gradient(to bottom right, #fff, #fff),
    linear-gradient(126deg, #0059ff 0%, #00ffb2 100%);
}
</style>
<div class="ring2"></div>
```
<style>
.ring2 {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid transparent;
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-size: cover;
  box-sizing: border-box;
  background-image: linear-gradient(to bottom right, #fff, #fff),
    linear-gradient(126deg, #0059ff 0%, #00ffb2 100%);
}
</style>
<div class="ring2"></div>
```

#### 梯形

<style>

.trapezoid {
  width: 100px;
  height: 25px;
  padding: 0.5em 1em 0.35em;
  position: relative;
  color: #fff;
 display:inline-block;
}

.trapezoid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: #58a;
  transform: perspective(0.5em) rotateX(3deg);
}
</style>
<div class="trapezoid"></div>
```
<style>
<!-- 这是之前在做的时候在网上搜到的一种解决方式 -->
.trapezoid {
  width: 100px;
  height: 25px;
  padding: 0.5em 1em 0.35em;
  position: relative;
  color: #fff;
}
.trapezoid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: #58a;
  transform: perspective(0.5em) rotateX(3deg);
}

</style>
<div class="trapezoid"></div>
```

#### 优惠券锯齿效果

<style>
.coupon {
  background: red;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
  height: 40px;
  width: 100px;
}
.coupon::before {
  content: ' ';
  width: 0;
  height: 100%;
  position: absolute;
  top: 0;
  border-right: 5px dotted #fff;
  left: -2px;
}
.coupon::after {
  content: ' ';
  width: 0;
  height: 100%;
  position: absolute;
  top: 0;
  border-left: 5px dotted #fff;
  right: -2px;
}
</style>
<div class="coupon"></div>

```

<style>
.coupon {
  background: red;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
  height: 40px;
  width: 100px;
}
.coupon::before {
  content: ' ';
  width: 0;
  height: 100%;
  position: absolute;
  top: 0;
  border-right: 5px dotted #fff;
  left: -2px;
}
.coupon::after {
  content: ' ';
  width: 0;
  height: 100%;
  position: absolute;
  top: 0;
  border-left: 5px dotted #fff;
  right: -2px;
}
</style>
<div class="coupon"></div>
```

文中所有例子可以在[demo](https://github.com/JMjiayou8/static_demo/tree/master/blog)中找到哦~
