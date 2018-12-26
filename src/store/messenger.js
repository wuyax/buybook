import Vue from 'vue';

const messenger = {
  namespaced: true,
  state: {},
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
export default messenger