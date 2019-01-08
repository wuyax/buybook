# 快速上手

## 安装

浏览器环境：
```js
// 完整引入
<script src="jfe.umd.min.js"></script>
```
```js
// 按需引入
<script src="jfe.util.umd.min.js"></script>
```

通过 npm：
```bash
$ npm install jflib --save
```

## 使用

在项目中引入
```js
// 按需引入
import {util} from 'jflib'
// 使用
let arr = [3,4,4,33,4,3,4]
util.unique(arr) // [3,4,33]

// 完整引入
import JFE from 'jflib'
// 使用
let arr = [3,4,4,33,4,3,4]
JEF.util.unique(arr) // [3,4,33]
```

本项目在浏览器端使用是通过`umd`方式导出，通过`npm`安装的`package`则是通过`ES6`的模块暴露方式暴露，你可以在任何支持的前端工程项目中引用。