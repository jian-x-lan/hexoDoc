---
title: js设置伪类
date: 2018-03-09 19:37:37

tags:
  - css
  - js
---

很普通的一个列表样式，设计图下来后我就直接把小图标抠下来，写到背景图片里。后来需求改动，内容要可配置的，不一定是这三个，颜色也不一定，所以背景图这种方法 pass。试了一下 border-left，实在达不到这种效果，又 pass。

<!-- more -->

请教了一下厉害的小姐姐，告诉我用 css 伪类就可以实现啦。刷刷刷就实现了这个效果。
新的问题来了，设置样式很简单，怎么在 js 里面动态生成 css 伪类还真没做过。。。
百度了一下，说了好几种方法，采用了下面这种：

```javascript
var segmentNum = 3
var pieColors = ['#ff9054', '#6392ff', '#ff4545']
var legends = []
for (var i = 0; i < segmentNum; i++) {
  legends.push(
    '<span class="w-legend w_legend_pie w_legend_' +
      i +
      '">' +
      segmentName[i] +
      '</span>'
  )
  document.styleSheets[0].addRule(
    '.w_legend_' + i + '::before',
    'content: "";width: 4px;height: 20px;background:' +
      pieColors[i] +
      ';position: absolute;left: 0;top: 4px;border-radius: 4px;'
  )
  document.styleSheets[0].insertRule(
    '.w_legend_' +
      i +
      '::before{content: "";width: 4px;height: 20px;background:' +
      pieColors[i] +
      ';position: absolute;left: 0;top: 4px;border-radius: 4px;}  ',
    i
  )
}
$('#legend_wrap1').html(legends.join(''))
```

网上有 html 的[data-attr](https://developer.mozilla.org/zh-CN/docs/Web/CSS/attr)的方法，可是试了一下，css 里面 background 设置 attr(data-attr)无效，只有 content 设置才有效，和需求不匹配。
