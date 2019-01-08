/* eslint-disable */
import Vue from 'vue';
import {
  mapState
} from 'vuex'
import store from '@/store'
const messenger = {
  namespaced: true,
  state() {
    return {
      messenger: 'messenger'
    }
  },
  mutations: {
    UPDATESTATE(state, payload) {
      state[payload.TOPIC] = payload.value
    },
    REGISTER(state, payload) {
      Vue.set(state, payload.TOPIC, payload.value)
    }
  },
  actions: {},
  getters: {}
}
export default {
  install(Vue, options = {}) {
    // 检测Vuex插件是否安装
    if (!Vue._installedPlugins.find(plugin => plugin.Store)) {
      throw new Error("To use messenger plugin, you must be installed after the Vuex plugin.")
    }
    store.registerModule('$_messenger_module', messenger)
    // 混合 
    /* Vue.mixin({
      created() {
        let $_myOption = this.$options.parent
        if ($_myOption === undefined && this.$store) {
          this.$store.registerModule('$_messenger_module', messenger)
        }
      },
    }) */
    Vue.prototype.$messenger = {
      regist(TOPIC, value) {
        if (!TOPIC || typeof TOPIC !== 'string' || !TOPIC.trim()) {
          throw new Error('请传入需要注册的KEY,且必须为非空string')
        }
        if (store.state.$_messenger_module[TOPIC]) {
          throw new Error(`${TOPIC}已经被注册！`)
        }
        store.commit('$_messenger_module/REGISTER', {
          TOPIC,
          value
        })
      },
      publish(TOPIC, value) {
        if (!store.state.$_messenger_module.hasOwnProperty(TOPIC)) {
          throw new Error(`你还没有注册${TOPIC},请先注册${TOPIC}`)
        }
        store.commit('$_messenger_module/UPDATESTATE', {
          TOPIC,
          value
        })
      },
      subscribe() {
        console.log('subscribe')
      },
      unsubscribe() {
        console.log('unsubscript')
      }

    }
  }
}