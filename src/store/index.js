import Vue from "vue";
import Vuex from "vuex";

import { user } from "./user";
import { store } from "./store";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    user,
    store
  },
  plugins: [
    createPersistedState(
      {
        key: "authorization",
        paths: ["user", "store"]
      },
      { storage: window.sessionStorage }
    )
  ]
});
