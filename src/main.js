import Vue from "vue";
import axios from "axios";
import App from "./App.vue";

import router from "./router";
import store from "./store";

axios.defaults.baseURL = "https://vue-auth-82c2e.firebaseio.com/";

// Interceptors
const reqIn = axios.interceptors.request.use(config => {
  console.log("Req", config);
  return config;
});

const resIn = axios.interceptors.response.use(res => {
  console.log("Resp", res);
  return res;
});

// Removing Interceptors
axios.interceptors.request.eject(reqIn);
axios.interceptors.response.eject(resIn);

new Vue({
  store,
  router,
  el: "#app",
  render: h => h(App)
});
