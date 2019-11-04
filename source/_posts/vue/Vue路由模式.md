---
title: vue路由模式问题
date: 2018-11-03 09:16:37
tags:
  - vue
---

vue 路由默认`hash`模式,应用在后台管理系统诸多不便。后台无法获取`#`后资源。无法进行相关权限控制。遂改成`history`模式。dev 开发环境是好的，但是打包后到服务器就是空白页。

<!--more-->

例如`http://xxx.xxx/aaa/bbb/ccc`是部署后的页面路径;`http://xxx.xxx` 是环境主机地址;`aaa` 是后台项目地址;`/bbb/ccc` 是前端路由;
本地开发时仅需配置/bbb/ccc 即可访问页面，但部署到后台会加入一个**contextpath**即 aaa,所以前端路由亦须加上 aaa 前缀，即/aaa/bbb/ccc
所以在 `router.js` 中需要定义

```javascript
// 定义一个变量，控制不同环境前端路由前缀
const publicPath = process.env.NODE_ENV === 'production' ? '/aaa' : '/'
//页面路由path: publicPath + '/bbb/ccc',
```
