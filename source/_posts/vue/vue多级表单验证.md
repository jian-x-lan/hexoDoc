---
title: vue多级表单验证
date: 2018-8-23 09:16:37
tags:
  - vue
---

做管理系统时无非就是表单表格以及一堆的弹出框。强迫症原则希望组件越少越好，那样页面结构就很清爽，结果就是单组件越来越臃肿。记录遇到的多级组件中表单验证的问题。

<!--more-->

- vue-cli2 和 element-ui
- 封装 form 表单为一个组件 AForm
- 封装含 AForm 表单的弹框组件 BDialog

> 使用

- AForm.vue

```html
<template>
  <form ref="form">
    ...
  </form>
</template>
<script>
  export default {
    methods: {
      resetFields(callback) {
        this.$refs.form.resetFields()
        callback(true)
      },
      validate(callback) {
        this.$refs.form.validate(valid => {
          callback(valid)
        })
      }
    }
  }
</script>
```

- BDialog.vue

```html
<template>
  <el-dialog>
    <a-form ref="addForm"></a-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="cancel" @click="closeDialog">取消</el-button>
      <el-button type="save" @click="saveData">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    methods: {
      closeDialog() {
        this.$refs['addForm'].resetFields(function() {})
        //todo 取消事件
      },
      saveData() {
        let self = this
        self.$refs['addForm'].validate(valid => {
          if (valid) {
            //todo 保存事件
          }
        })
      }
    }
  }
</script>
```
