/*eslint-disable*/
import store from '@/store'
import {
  mapState
} from 'vuex'
export default class AppState {
  // todo 判断是否存在 key
  static regist(TOPIC, value) {
    if (!TOPIC || typeof TOPIC !== 'string' || !TOPIC.trim()) {
      console.warn('请传入需要注册的KEY,且必须为非空string')
      return
    }
    if (store.state.messenger[TOPIC]) {
      console.warn(`${TOPIC}已经被注册！`)
      return
    }
    store.commit('messenger/REGISTER', {
      TOPIC,
      value
    })
  }
  // 获取状态
  static getState(TOPIC) {
    if (typeof TOPIC === 'string') {
      return mapState({
        [TOPIC]: state => state.messenger[TOPIC]
      })
    } else if (Array.isArray(TOPIC)) {
      let stateKey = {}
      TOPIC.forEach((item, index) => {
        stateKey[item] = state => state.messenger[item]
      })
      return mapState(stateKey)
    }
  }
  static updated(TOPIC, value) {
    if (!store.state.messenger.hasOwnProperty(TOPIC)) {
      return
    }
    store.commit('messenger/UPDATESTATE', {
      TOPIC,
      value
    })
  }
}