export const user = {
  namespaced: true,
  actions: {
    getUsername: ({ commit }, Username) => {
      commit("addUsername", Username);
    },
    getToken: ({ commit }, token) => {
      commit("addToken", token);
    },
    getRole: ({ commit }, role) => {
      commit("addRole", role);
    },
    logout: ({ commit }) => {
      commit("remove");
    }
  },
  state: {
    username: null,
    token: null,
    role: null
  },
  mutations: {
    addUsername: (state, newUsername) => {
      state.username = newUsername;
    },
    addToken: (state, newToken) => {
      state.token = newToken;
      localStorage.setItem("token", newToken);
    },
    addRole: (state, newRole) => {
      state.role = newRole;
    },
    remove: state => {
      state.username = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem("token", null);
    }
  },
  getters: {
    username: state => state.username,
    token: state => state.token,
    role: state => state.role
  }
};
