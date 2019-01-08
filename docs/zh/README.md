---
home: true
heroImage: /hero.png
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 精品组件
  details: 提供在实际开发中使用频率极高的代码片段和方法，节约大量上网Google时间，提高工作效率。
- title: 模块化
  details: 适用者可以通过开发需求按需引入需要的方法，减小打包文件体积。
- title: 详细的文档
  details: 我们提供详细的使用文档
footer: MIT Licensed | Copyright © 2018-present JFE
---

## 使用
浏览器环境：
```
// 完整引入
<script src="jfe.umd.min.js"></script>
```
```
// 按需引入
<script src="jfe.util.umd.min.js"></script>
```
通过 npm：
```
$ npm install jflib --save
```
在组件中引入
```
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