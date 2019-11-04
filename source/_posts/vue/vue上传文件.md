---
title: vue上传文件
date: 2018-9-1 09:16:37

tags:
  - vue
  - axios
---

vue 项目中使用 axios 上传文件

<!-- more -->

```
//axios配置
import qs from 'qs';
axios.interceptors.request.use((config) => {
  if (config.method == "post") {
    if (config.type == 'upload') {
      //配置上传headers
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      //后台接受formdata格式数据,非json。用qs.stringify转换即可
      config.data = qs.stringify(filterParamObj(config.data));
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
//去除空值参数
function filterParamObj(obj) {
  Object.keys(obj).forEach(key => obj[key] ? null : delete obj[key])
  return obj;
};
// 接口定义
async function addMsg(form) {
  const res = await axios.post(`/targetMsg/add`, form, {
    type: 'upload'
  })
  return res.data;
}
//界面调用getFile存储文件内容
<el-form-item label="报文模板" >
   <div class="upload-wrap">
     <el-button type="file" icon="iconfont icon-upload">原始报文上传</el-button>
     <input type="file" @change="getFile($event,'origin')"/>
   </div>
   <div class="upload-wrap">
     <el-button type="file" icon="iconfont icon-upload">目标报文上传</el-button>
     <input type="file" @change="getFile($event,'target')"/>
   </div>
</el-form-item>
//获取上传文件信息
getFile(event, key) {
  let file = event.target.files[0];
  this[key + "file"] = file;
},
//调用上传接口
async saveMsg(data) {
  let self = this;
  let formData = new FormData();
  Object.keys(data).map(key => {
    formData.append(key, data[`${key}`]);
  });
  formData.append("ORIGINAL_MSG_TEMPLATE", this.originfile);
  formData.append("MSG_TEMPLATE", this.targetfile);
  const res = await addMsg(formData);
},
```
