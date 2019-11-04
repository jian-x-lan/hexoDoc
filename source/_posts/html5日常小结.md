---
title: html5日常小结
date: 2019-9-9 12:00:00
tags:
  - html
---

记录日常开发过程中遇到的一些知识点

<!---more-->

#### 表单元素的 disabled 和 readonly

1. `readonly` 只针对 `input(text/password)`和 `textarea` 有效；`disabled` 对于所有的表单元素有效，包括 `select`,`radio`,`checkbox`,`button` 等。

<div>
<input type="text" readonly='true' value="readonly"/>
<input type="text" disabled value="disabled"/>
</div>
<div>
<input type="password" readonly='true' value="readonly"/>
<input type="password" disabled value="disabled"/>
</div>
<div>
<textarea type="text" readonly='true' >readonly</textarea>
<textarea type="text" disabled >disabled</textarea>
</div>
<div>

<div>
<input type="radio" readonly='true' value="readonly"/>readonly
<input type="radio" disabled value="disabled"/>disabled
</div>
<div>
<select readonly='true'><option value="readonly">readonly</option></select>
<select disabled value="disabled"><option value="disabled">disabled</option></select>
</div>
<div>
<input type="checkbox" readonly='true' value="readonly"/>readonly
<input type="checkbox" disabled value="disabled"/>disabled
</div>
<div>
<button readonly='true'>readonly</button>
<button disabled>disabled</button>
</div>

2. 表单元素使用了 `disabled` 后，表单提交时元素的值不会被传递出去，而 `readonly` 会将该值传递出去。
3. 用户可以通过 tab 键切换到`readonly`控件，选取或复制其中的内容。

#### 调用系统摄像头

```html
<!-- capture:camera--照相机；camcorder--摄像机；microphone--录音 -->
<!-- 录制视频 -->
<input type="file" accept="video/*" capture />

<!-- 拍照 -->
<input type="file" accept="image/*" capture="camera" />
<input type="file" accept="image/*;capture=camera" />
```

#### select 的 option 赋值校验问题

表单验证的框架在判断 `select` 是否选值时，判断的基本上都是 option 的 value 属性

```html
<!-- value一定要等于空值，不然表单验证的时候就认为select是选择了值。 -->
<option value="“”">请选择</option>

<!-- 验证一直有问题 -->
<option value="“0”">请选择</option>
```
