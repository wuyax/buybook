// Vue 里的全局事件总线
import Vue from 'vue'
const EventBus = new Vue()
export default {
  install(Vue, options = {}) {
    Vue.prototype.$bus = EventBus
  }
}