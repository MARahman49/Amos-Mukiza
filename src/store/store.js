import Vue from 'vue'
import Vuex from 'vuex'
import blog from './modules/blog/store';

Vue.use(Vuex)

const state = {
};
const mutations = {
};
const getters = {
};
const actions = {
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    blog,
  }
})
