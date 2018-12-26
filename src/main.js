import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import readXlsx from './plugin/readXlsx.js'
import pubsub from '@/assets/js/pubsub.js'
// import PubSub from 'pubsub-js'

import '@/assets/css/index.scss'
Vue.prototype.pubsub = pubsub
Vue.config.productionTip = false;
Vue.use(readXlsx);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
