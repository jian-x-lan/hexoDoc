---
title: a的伪类样式
date: 2017-08-28 10:37:37

tags:
  - css
---

被问到 `a:visited` 样式不起作用,所以小小的研究了一下。

<!--more-->

```
:link向未访问过的链接添加特殊的样式
:visited向访问过的链接添加特殊的样式
:hover鼠标悬停在链接上时的样式
:active设置当点击链接时的样式。
```

> 定义[顺序](https://www.cnblogs.com/xiayi/p/5350423.html)不能乱，不然可能不起作用

- **这 4 个伪类特指度相同;一个链接可能同时处于多种状态，即同时属于多个伪类。**

1. 未点击链接前，link 伪类长期处于激活状态，鼠标悬停（或点击）时，<a>链接同时处于 link 和 hover(或 active)状态，由于它们特指度相同，在同时激活的情况下，后出现的伪类样式会覆盖前面的伪类样式，故 link 状态必须写在 hover(或 active)之前。
2. 再讨论 hover 和 active 的顺序，若把 hover 放在 active 后面，当点击链接一瞬，实际你在激活 active 状态的同时触发了 hover 伪类,hover 在后面覆盖了 active 的颜色，所以无法看到 active 的颜色。故 hover 在 active 之前
3. 若把 visited 放在 hover 后面，那已访问过的链接一直触发着 visited 伪类，会覆盖 hover 样式。
4. 其实 link、visited 两个伪类之间顺序无所谓。（因为它俩不可能同时触发，即又未访问同时又已访问。）

> 没有设置 href,所以:link 和:visited 是不起作用的。

> href 设置一样，会同时起作用。
