import ax from "axios";
import router from "../router";
import authReq from "../auth-ax";
const API_KEY = "";

const state = {
  user: null,
  userId: null,
  idToken: null,
  refreshToken: null
};

const getters = {
  user: state => state.user,
  isAuthenticated: state => state.idToken !== null
};

const actions = {
  setLogoutTimer({ commit }, expirationTime) {
    setTimeout(() => commit("LOGOUT_USER"), expirationTime * 1000);
  },

  signUp({ commit, dispatch }, authData) {
    authReq
      .post(`accounts:signUp?key=${API_KEY}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        console.log(res);
        commit("SET_AUTH_USER", res.data);
        dispatch("storeUserData", authData);
        dispatch("storeToken", res.data);
        dispatch("setLogoutTimer", res.data.expiresIn);
        router.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
      });
  },

  login({ commit, dispatch }, authData) {
    authReq
      .post(`accounts:signInWithPassword?key=${API_KEY}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        console.log(res);
        commit("SET_AUTH_USER", res.data);
        dispatch("setLogoutTimer", res.data.expiresIn);
        dispatch("storeToken", res.data);
        router.push("/dashboard");
      })
      .catch(err => console.log(err));
  },

  storeToken({ commit }, { idToken, expiresIn, localId, refreshToken }) {
    let now = new Date();
    localStorage.setItem("token", idToken);
    localStorage.setItem("userId", localId);
    let expirationDate = new Date(now.getTime() + expiresIn * 1000);
    localStorage.setItem("expiresOn", expirationDate);
    localStorage.setItem("refreshToken", refreshToken);
  },

  storeUserData({ commit, state }, data) {
    if (!state.idToken) {
      return;
    }
    ax.post(`users.json?auth=${state.idToken}`, data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  },

  fetchUser({ commit }) {
    ax.get(`users.json?auth=${state.idToken}`)
      .then(res => {
        let data = res.data;
        const users = [];
        for (let key in data) {
          const user = data[key];
          user.id = key;
          users.push(user);
        }
        commit("STORE_USER", users[0]);
      })
      .catch(err => console.log(err));
  },

  logout({ commit }) {
    commit("LOGOUT_USER");
    localStorage.removeItem("expiresOn");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    router.replace("/signin");
  },

  loadApp({ commit, dispatch }) {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const expiresOn = localStorage.getItem("expiresOn");
    const now = new Date();
    if (now >= expiresOn) {
      return;
    }
    const userId = localStorage.getItem("userId");
    const refreshToken = localStorage.getItem("refreshToken");
    commit("SET_AUTH_USER", { idToken: token, localId: userId, refreshToken });
    dispatch("refreshAuthToken");
    router.replace("/dashboard");
  },

  refreshAuthToken() {
    // Make Api Call to refresh the token
    // Commit to store
    // Set the Axios Headers of the
  }
};

const mutations = {
  SET_AUTH_USER(state, payload) {
    state.idToken = payload.idToken;
    state.userId = payload.localId;
    state.refreshToken = payload.refreshToken;
  },
  STORE_USER(state, payload) {
    state.user = payload;
  },
  LOGOUT_USER(state) {
    state.userId = null;
    state.idToken = null;
    state.user = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
};
