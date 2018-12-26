export default {
  changeState({commit}, name) {
    commit('CHANGENAME', name)
  },
  publish({commit}, params) {
    commit('DISPATCHPARAMS', params)
  }
}