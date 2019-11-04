---
title: vue中slot多级传递
date: 2017-8-22 09:16:37
tags:
  - vue
---

记录遇到的多级组件中 slot 传递的问题。

<!--more-->

- 封装 form 表单为一个组件 AForm
- 封装含 form 表单的弹框组件 BDialog
- page 页面需要往弹框中传递额外的 slot 表单元素,slot 定义在 AForm 组件中，但调用的是组件 BDialog。

> 解决方案

- AForm.vue

```
<template>
  <form>
    ...
    <slot name="extra"></slot>
  </form>
</template>
```

- BDialog.vue

```
<template>
  <el-dialog ...>
    <a-form>
      <el-row slot="extra">
        <slot name="extra"></slot>
      </el-row>
    </a-form>
  </el-dialog>
</template>
```

- page.vue

```
<template>
  <b-dialog ...>
    <div slot="extra">
      ...
    </div>
  </b-dialog>
</template>
```
