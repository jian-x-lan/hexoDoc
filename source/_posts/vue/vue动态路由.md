---
title: vue动态路由
date: 2018-8-20 09:16:37
tags:
  - vue
---

我的系统需求是，搭建一个首页框架，里面涉及了多个子系统的菜单信息，页面是嵌入的 iframe。根据接口数据控制展示/隐藏菜单并不是大的问题，但是如果需要导航栏路由和菜单栏有联动效果，则需要引入动态路由的功能了。
当然了，如果子系统不是嵌入的 iframe,而是 vue 页面文件，那更需要动态路由了。

<!--more-->

#### 获取后台菜单数据

`store.js`

```javascript
//mutations
async getMenus(state) {
  const menus = await getMenus();
  let _menus = [];
  menus.DATA.map(menu => {
   //操作得到想要的数据格式_menus
  });
  state.menus = _menus;
  state.roleMenus = getRoleMenus(state.menus);//utils中拼接路由信息
},
//actions
getMenuData({ commit }) {
    commit('getMenus')
}
```

#### 拼接路由数据

`util.js` 具体看项目需求拼接数据

```javascript
//拼接动态权限路由信息
const getRoleMenus = menus => {
  menus = menus || [] //接口获取的数据
  let arr = [
    {
      path: '/index',
      name: 'index',
      component: () => import('../../views/Index.vue'),
      children: []
    }
  ]
  menus.map(item => {
    arr[0].children = arr[0].children.concat(getDeptRoute(item))
  })
  return arr
}
//数据处理
const getDeptRoute = data => {
  let children = data.childMenus || []
  let arr = []
  for (var i = 0; i < children.length; i++) {
    if (children[i].childMenus.length > 0) {
      let aa = getDeptRoute(children[i])
      arr = arr.concat(aa)
    } else {
      arr.push({
        path: children[i].menuUrl,
        name: children[i].menuUrl.substr(1)
      })
    }
  }
  return arr
}
```

#### addRoutes

`main.js`

```javascript
router.beforeEach((to, from, next) => {
  if (to.name == 'home') {
    next() //主页是固定路由，直接跳转
  } else {
    if (!store.state.hasLogind || store.state.menus.length == 0) {
      store.dispatch('getMenuData') //获取菜单数据
      setTimeout(function() {
        //异步获取数据有时差，所以用了setTimeout
        store.commit('setLoginState', true)
        router.addRoutes(store.state.roleMenus)
        next({ ...to, replace: true })
      }, 500)
    } else {
      next()
    }
  }
})
```
