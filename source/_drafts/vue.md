### 问题

> [插值语句闪现](https://blog.csdn.net/catiecarter/article/details/76083841)

- @import 是在页面 DOM 完全载入后才会进行加载，如果将[v-cloak]写在@import 加载的 css 文件中，页面仍旧会闪烁。为了避免这种情况，可以将[v-cloak]写在 link 引入的 css 中，或者写一个内联 css 样式。

```
[v-cloak] {
  display: none;
}
<div id="app" v-cloak>{{ message }}</div>
```

### 其它

- falsy:false，0，“”，null，undefined 和 NaN
