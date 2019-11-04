---
title: js固定宽高比
date: 2018-02-07 15:58:00

tags:
  - js
  - css
---

搞一个大屏，需要 16:9 的宽高比，嗯，没搞过。请教了同事，给的解决方案是按照 1920\*1080 的设计图后再进行整个页面的缩放。

<!--more-->

transform-origin: left top 0;//定义左上角为缩放的基点位置；未设置时缩放后的页面总是居中显示，调试很不方便
\$('.bigScreen-wrapper').css('transform', 'scale(' + document.body.clientWidth / 1920 + ',' + document.body.clientWidth / 1920 + ')');主内容宽高等比缩放

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>16:9</title>
    <style>
      body {
        overflow: hidden;
        margin: 0;
        padding: 0;
      }
      .bigScreen-wrapper {
        width: 1920px;
        height: 1080px;
        position: relative;
        transform-origin: left top 0;
        padding: 24px 30px 28px 28px;
        box-sizing: border-box;
      }
    </style>
  </head>

  <body>
    <div class="bigScreen-wrapper">...</div>
    <script src="./assets/js/easyui/jquery.min.js"></script>
    <script>
      $(function() {
        $('.bigScreen-wrapper').css(
          'transform',
          'scale(' +
            document.body.clientWidth / 1920 +
            ',' +
            document.body.clientWidth / 1920 +
            ')'
        )
      })
    </script>
  </body>
</html>
```
