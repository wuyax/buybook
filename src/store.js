import Vue from "vue";
import Vuex from "vuex";
import state from './store/states.js'
import actions from './store/actions.js'
import mutations from './store/mutations.js'
import getters from './store/getters.js'
import messenger from './store/messenger'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    messenger
  },
  state,
  getters,
  mutations,
  actions,
  strict: true
});
