import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import readXlsx from './plugin/readXlsx.js'
import bus from '@/assets/js/bus'
import messenger from '@/assets/js/plugin.js'
import PubSub from 'pubsub-js'

import '@/assets/css/index.scss'
Vue.prototype.pubsub = PubSub
Vue.config.productionTip = false;
Vue.use(readXlsx);
Vue.use(messenger)
Vue.use(bus)

Vue.directive('loadOrder', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding, vnode, oldVnode) {
    // el.style.display = 'none'
    let order = store.state.currentOrder
    let value = binding.value
    if(order === (value - 1)){
      // el.style.display = 'none'
    }
    
  },
  componentUpdated: function(el, binding, vnode, oldVnode) {
    // console.log(binding.value)
    let value = binding.value
    // let order = store.state.currentOrder
    store.commit('UPDATECURRENTORDER', value)
    /* if(order === value){
      el.style.display = 'block'
    } */
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
