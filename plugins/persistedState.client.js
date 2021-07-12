import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    token: store.state.login.token
  })(store);
};
