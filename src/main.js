import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import readXlsx from './plugin/readXlsx.js'

Vue.config.productionTip = false;
Vue.use(readXlsx);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
