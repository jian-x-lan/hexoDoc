---
title: 常见jquery操作
date: 2018-02-07 15:58:00
tags:
  - js
  - jquery
---

第一份工作就直接上手 angular+bootstrap+nodejs。前端基础一片空白，样式不会写，jquery 不会用，只是锻炼了 js，也仅仅是处理业务数据的思想。换了工作后去 yoho,组长前几天啥任务也没给我安排，就给我丢了 [jquery](http://t.mb5u.com/jquery/) 的文档让我看，说一个前端咋能不会 jquery 呢。但说实话，一直到现在，我都还是用的不咋的 😅。一度自嘲只会 show 和 hide。

<!--more-->

##### checkbox 全选

```java
<div class="form-item">
    <span class="form-label">静态多选项:</span>
    <ul class="form-box clearfix">
        <li class="form-checkbox-item">
            <label><input class="check-all" type="checkbox" name="checkItem"
                                  value="all"/>全选</label>
        </li>
        <li class="form-checkbox-item">
            <label><input class="check-btn" type="checkbox" name="checkItem"
                                  value="500001"/>多选1</label>
        </li>
        <li class="form-checkbox-item">
            <label><input class="check-btn" type="checkbox" name="checkItem"
                                  value="500002"/>多选2</label>
        </li>
        <li class="form-checkbox-item">
            <label><input class="check-btn" type="checkbox" name="checkItem"
                                  value="500003"/>多选3</label>
        </li>
    </ul>
</div>
//全选点击
$(".check-all").click(function () {
    $('.check-btn[name="' + $(this).attr('name') + '"]').prop('checked', this.checked)
})

//单选点击
$('.check-btn').click(function () {
    var name = $(this).attr('name');
    $('.check-all[name="' + name + '"]').prop('checked', $('.check-btn[name="' + name + '"').not(':checked').length === 0)
})
```
