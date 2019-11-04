---
title: vue权限问题
date: 2017-8-03 09:16:37
tags:
  - vue
---

最近搞一个 vue 的项目，接口带了权限验证，于是乎稍微研究了一下，中间遇到的各种坑都来源于自己概念的不熟悉。

<!--more-->

一是 vue 路由层的控制，由于项目的路由有规律可循，所以没有采用网上 requireAuth 那种在需要加验证的路由上[配置 meta](http://www.cnblogs.com/dhsz/p/6410031.html)

```javascript
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({...})

router.beforeEach((to, from, next) => {
  if(/^\/[S|B|V]/.test(to.path)){
    if (isLogin()) {//判断token信息的自写方法
      next();
    }
    else {
      next({ name: 'login' })//跳转到登录页
    }
  }
  else {
    next();
  }
})
```

二是 http 拦截器 ，统一处理所有 http 请求和响应，就得用上 axios 的拦截器。

```javascript
import axios from 'axios'
// http request 拦截器
axios.interceptors.request.use(
  function(config) {
    config.headers.token = sessionStorage.getItem('user_token') //将接口返回的token信息配置到接口请求中
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
// http response 拦截器
axios.interceptors.response.use(
  function(response) {
    if (response.data.code == '1001' || response.data.code == '1002') {
      //具体的判断token失效的参数
      sessionStorage.setItem('user_token', '')
      sessionStorage.setItem('LoginUser', '{}')
      alert(response.data.msg)
      window.location.href = '/#/login' //需求方要求一旦出错立即跳转登录，所以采取这种侵入式的手段。
    } else {
      return response
    }
  },
  function(error) {
    return Promise.reject(error)
  }
)
```
