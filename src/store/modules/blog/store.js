import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

const state = {
  blogList:[],
  blog: {},
  bigStory: {}
};

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
};
