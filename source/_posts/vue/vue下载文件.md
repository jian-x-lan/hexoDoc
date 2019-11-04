---
title: vue下载文件
date: 2018-9-1 09:18:37

tags:
  - vue
  - axios
---

vue 项目中使用 axios 下载文件

<!-- more -->

```javascript
//定义接口 设置 responseType: 'blob'
async function exportScript(msgId) {
  const res = await axios({
    method: 'get',
    url: `/msgScript/exportScript?msgId=${msgId}`,
    responseType: 'blob'
  })
  return res.data;
}
//调用接口
async exportMsg(msgId) {
  let self = this;
  self.curMsgId = msgId;
  const res = await exportScript(msgId);
  if (res) {
    this.download(res);
  } else {
    self.$message.error("出错了！");
  }
},
//下载生成文件
download(data) {
  let self = this;
  if (!data) {
    return;
  }
  let url = window.URL.createObjectURL(new Blob([data]));
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", `${self.curMsgId}.sql`);
  document.body.appendChild(link);
  link.click();
},

```
