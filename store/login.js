// import VuexPersistence from "vuex-persist";

export const state = () => ({
  login: null,
  newLogin: [],
  token: null
});

export const mutations = {
  setLogin(state, login) {
    state.login = login || null;
    state.token = login.token;
  }
};
export const getters = {
  isSignedIn(state) {
    return state.isSignedIn;
  },
  loggedLogin(state) {
    return state.login;
  }
};
