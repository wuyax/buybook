# 目录结构

我们也遵循 **“约定优于配置”** 的原则，目录结构如下：

```
.
├── build
│   ├── config.js
│   ├── rollup.config.js
│   └── rollup.config.sub.js
│
├── dist
│   ├── jfe.chart.esm.js
│   ├── jfe.chart.esm.min.js
│   ├── jfe.chart.umd.js
│   ├── jfe.chart.umd.min.js
│   ├── jfe.esm.js
│   ├── jfe.esm.min.js
│   ├── jfe.umd.js
│   ├── jfe.umd.min.js
│   ├── jfe.util.esm.js
│   ├── jfe.util.esm.min.js
│   ├── jfe.util.umd.js
│   ├── jfe.util.umd.min.js
│   ├── jfe.visual.esm.js
│   ├── jfe.visual.esm.min.js
│   ├── jfe.visual.umd.js
│   └── jfe.visual.umd.min.js
│
├── src
│   ├── chart
│   │   ├── index.js
│   │   └── chart.js
│   ├── util
│   │   ├── index.js
│   │   ├── array
│   │   │   └── index.js
│   │   ├── common
│   │   │   └── index.js
│   │   ├── stroge
│   │   │   └── index.js
│   │   ├── type
│   │   │   └── index.js
│   │   └── validate
│   │       └── index.js
│   ├── visual
│   │       └── index.js
│   ├── index.js
│   └── .babelrc
│
├── .eslintrc
├── .gitignore
├── CHANGELOG.md
├── LICENSE
├── README.md
├── package-lock.json
└── package.json
```


- `build/config.js` 在项目构建中一些公共配置
- `build/rollup.config.js` **rollup**打包配置文件，默认的配置是`es`,你可以通过参数来控制命令的最终执行方式。
- `build/rollup.config.sub.js` 和 `rollup.config.js` 作用一样，唯一的区别是，该配置项能把打包以后的代码拆分成小的模块。
- `dist/jfe.esm.min.js` 以`es`的方式打包的模块，你通过`npm`安装的话默认就是引入的它了。
- `dist/jfe.esm.js` 以`es`的方式打包的模块，和 `dist/jfe.esm.min.js` 的区别是它没有压缩过，默认也不是引入它。
- `src/inde.js` `src`目录存放的都是我们写的代码，没有经过压缩，并且有详尽的注释。`index.js`是**总入口**
::: warning Note
`dist`目录下的其它文件就不一一介绍了，因为我觉得你看文件的名字就知道它是什么意思了。需要说明的是如果按需引入的话请注意文件名。
:::

::: tip Note
没有介绍的文件或者文件夹就不一一介绍了，毕竟一看就知道什么意思了。
:::
