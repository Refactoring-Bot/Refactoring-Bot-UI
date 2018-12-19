// Bootstrap CSS
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
// Bootswatch theme
import "bootswatch/dist/flatly/bootstrap.min.css";

// IE polyfills
import "core-js/es6/array";
import "core-js/es6/string";
import "core-js/es7/array";

// Main Vue library
import Vue from "vue";

// BootstrapVue UI components library
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);

// Import custom filters that are globally usable in Vue components
import "./common/filters";

// Routes
import VueRouter from "vue-router";
Vue.use(VueRouter);
import routes from "./routes";
const router = new VueRouter({
  // mode: "history",
  routes
});

// Kick start the main Vue component
import App from "./App.vue";
window.onload = () => {
  const app = new Vue({
    el: ".app",
    router,
    render: (h) => h(App)
  });
};
