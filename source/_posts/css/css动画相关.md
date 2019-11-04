---
title: css动画相关
date: 2019-09-26 10:37:37

tags:
  - css
---

CSS3 动画库:[Animate.css](https://daneden.github.io/animate.css/?)
一个菜鸟教程上的例子[行星运动](https://c.runoob.com/codedemo/5528)

一直做的都是管理平台的页面，涉及动画的机会少之又少，加上需要迷之兼容 IE 低版本，就更加没有练手的机会了。但是真的不能这么不思进取啦。一步一步记录我记得住的东西。

<!--more-->

### transition

没错，我还能有机会接触的仅仅是用 transition 实现一些过渡效果,而我一直觉得这就是动画效果啦 😂

```
.item{
  height:10px;
  transition:height 1s;
}
.item:hover{
  height:50px;
}
```

### transform 转换

1. transform

常用就这三个了，别的等用到了再理解记忆吧

- translate(x,y) 平移
- rotate(angle) 旋转
- scale(x,y) 缩放

2. transform-origin

借助旋转的例子稍稍理解了一下,就是定义一个操作基点，转换操作围绕着这个点来。唔，但是自己写，估计道阻且长着呢。

### animation

#### `@keyframes` 定义动画

```css
@keyframes myfirst {
  0% {
    background: red;
  }
  25% {
    background: yellow;
  }
  50% {
    background: blue;
  }
  100% {
    background: green;
  }
}

@-webkit-keyframes myfirst /* Safari 与 Chrome */ {
  0% {
    background: red;
  }
  25% {
    background: yellow;
  }
  50% {
    background: blue;
  }
  100% {
    background: green;
  }
}
```

#### `animation`

name duration timing-function delay iteration-count direction fill-mode play-state;

- `animation-timing-function`
  linear 动画从头到尾的速度是相同的
  ease 默认。动画以低速开始，然后加快，在结束前变慢
  ease-in 动画以低速开始
  ease-out 动画以低速结束
  ease-in-out 动画以低速开始和结束。

- `animation-iteration-count`
  n 一个数字，定义应该播放多少次动画
  infinite 指定动画应该播放无限次（永远）

- `animation-direction`: normal|reverse|alternate|alternate-reverse|initial|inherit;
  normal 默认值。动画按正常播放
  reverse 动画反向播放
  alternate 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放
  alternate-reverse 动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放
  initial 设置该属性为它的默认值
  inherit 从`父元素继承该属性

#### `animation-play-state`

paused|running;

- [动画是可以暂停的](http://www.daqianduan.com/7027.html)

### 实践例子

1. 小球绕大圈

```html
<style>
  .circle {
    width: 100px;
    height: 100px;
    border: 1px dashed #333;
    border-radius: 50%;
    position: relative;
  }

  .ball {
    position: absolute;
    left: -5px;
    top: 50px;
    width: 10px;
    height: 10px;
    background: #dd7676;
    border-radius: 50%;
    transform-origin: 55px 0;
    animation: roate 5s linear infinite;
  }

  @keyframes roate {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
<div class="circle">
  <div class="ball"></div>
</div>
```
