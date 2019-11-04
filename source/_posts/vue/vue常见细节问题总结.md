---
title: vue常见细节问题总结
date: 2019-9-03 09:16:37
tags:
  - vue
---

整理一波 vue 开发过程中遇到的比较细节但很无奈的小问题吧

<!--more-->

#### 插值闪烁

1. 使用 `v-text` 和 `v-html` 指令来替代&#123;&#123;&#125;&#125;
2. 使用 `v-cloak`

```html
<p v-cloak>{{msg}}</p>
<style>
  [v-cloak] {
    display: none;
  }
</style>
```

#### element-ui 下拉框选中不赋值

- 多数情况下是因为某个地方重置了属性值

#### 数组赋值操作

```javascript
this.$set(arr, index, value)
```

#### vue 获取 dom 元素位置

```javascript
this.$refs['xx'].getBoundingClientRect()
// 获取组件高度
this.$refs.xx.$el.offsetHeight
// 设置元素样式
this.$refs.xx.style.top = 100 + 'px'
```
