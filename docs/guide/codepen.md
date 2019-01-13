# Codepen支持

## 创建pen

1. 登录[codepen.io](https://codepen.io/) 创建一个新的`pen`
2. 点击右下角`Embed`在*Embed This Pen*弹窗中滚动到最下方，切换到`iframe`方式
  获取需要嵌入的pen的`src`格式如下:  
  `src='//codepen.io/airen/embed/xmXQrW/?height=265&theme-id=0&default-tab=js,result'`

## 在文档中引入codepen

1. 使用组件`<code-pen/>`，组件件接收3个参数`penSrc`,`penHeigh`,`penTitle`

  | 参数名称 | 参数值 | 是否必须 | 默认值 |
  |---|---|---|---|
  | `penSrc` | pen的src | `true` | |
  | `penHeigh` | iframe高度 | `false` | 340 |
  | `penTitle` | pen的标题 | `false` | demo |

  示例：
  ```vue
  <code-pen penSrc='//codepen.io/airen/embed/xmXQrW/' penHeight='350'/>
  ```
2. 效果

<code-pen penSrc='//codepen.io/airen/embed/xmXQrW/' penHeight='350'/>