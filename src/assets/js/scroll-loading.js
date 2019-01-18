import throttle from './throttle'
export default class ScrollLoad {
  defaultOptions = {
    selector: undefined, // 选择器
    offset: 0,  // 偏移量
    callback: undefined // 回调函数
  }
  // 是否滚动到底部
  isBottom = false

  constructor(options = {}) {
    this._options = Object.assign({}, this.defaultOptions, options)
    this.container = document.querySelector(this._options.selector) || window

    this.scrollListener = this.scrollListener.bind(this)
    this.scrollListenerThrottled = throttle(this.scrollListener, 100)

    this.attachEventListener(this.container, 'scroll', this.scrollListenerThrottled)
  }

  attachEventListener(element, type, callback) {
    if (typeof callback != 'function') {
      return
    }
    element.addEventListener(type, callback)
  }
  detachEventListener(element, type, callback) {
    element.removeEventListener(type, callback)
  }

  scrollListener(ev) {
    let sh = ev.target.scrollHeight || document.body.scrollHeight
    let st = ev.target.scrollTop || document.documentElement.scrollTop
    let ch = ev.target.clientHeight || window.innerHeight
    // console.log(sh,st,ch)
    if (sh - ch <= st + this._options.offset) {
      console.log('trigger')
      this._options.callback(ev)

    }
  }
  resizeListener(ev) {

  }

  off() {
    this.detachEventListener(this.container, 'scroll', this.scrollListenerThrottled)
  }
  
  end() {

  }
}