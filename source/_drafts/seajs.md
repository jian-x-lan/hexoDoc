#### 加载模块规范 CMD/AMD

CommonJS 规范加载模块是同步的，只有加载完成，才能执行后面的操作。
AMD 规范是非同步加载模块，允许指定回调函数。

> CommonJS 规范中的 module、exports 和 require

- 每个文件就是一个模块，有自己的作用域。每个模块内部，`module` 变量代表当前模块，是一个对象，它的 `exports` 属性（即 module.exports）是对外的接口。
- module.exports 属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取 module.exports 变量。
- 为了方便，Node 为每个模块提供一个 `exports` 变量，指向 `module.exports`。
- `require`命令用于加载模块文件。

```javascript
//CMD
define(function(require, exports, module) {
   let a = require('./a');
   a.doSomething();
   ···
   let b = require('./b'); // 依赖可以就近书写
   b.doSomething();
   ...
})

// AMD 默认推荐的是
define(['./a', './b'], function(a, b) {
  // 依赖必须一开始就写好
  a.doSomething()
  ...
  b.doSomething()
  ...
})
```

#### CMD

1. 通过 define 关键字来定义模块，最基本的格式为：`define(factory)`;//这里的 define 是一个全局函数，`factory` 可以是函数或者合法的值。

- define({'foo':'foo'});//factory 为对象，表示该模块的接口为对象。

2.
