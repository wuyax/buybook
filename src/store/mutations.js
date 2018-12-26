import Vue from 'vue'
export default {
  CHANGENAME(state, payload) {
    state.name = payload
  },
  // 分发参数
  DISPATCHPARAMS(state, payload) {
    if (!state[payload.TOPIC]) {
      Vue.set(state, payload.TOPIC)
    }
    state[payload.TOPIC] = payload
  },
  /* UPDATESTATE(state, payload) {
    state[payload.TOPIC] = payload.value
  } */
}