import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import Auth from "./modules/Auth";

export default new Vuex.Store({
  modules: { Auth },
  state: {},
  mutations: {},
  actions: {},
  getters: {}
});
