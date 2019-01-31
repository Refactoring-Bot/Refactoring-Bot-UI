// Bootstrap CSS
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";

// Bootswatch theme (https://bootswatch.com)
import "bootswatch/dist/flatly/bootstrap.min.css";

// IE polyfills
import "core-js/es6/array";
import "core-js/es6/string";
import "core-js/es7/array";

// Main Vue library
import Vue from "vue";

// Fontawesome icon setup
import { library } from "@fortawesome/fontawesome-svg-core";
// Only import the icons you really use to reduce the size of the import, e.g. 'faCheckCircle' instead of 'fas' (all free solid icons)
import {
  faCheckCircle,
  faEdit,
  faExclamationTriangle,
  faPlusCircle,
  faSave,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faCheckCircle,
  faEdit,
  faExclamationTriangle,
  faPlusCircle,
  faSave,
  faTrashAlt
);
Vue.component("fa-icon", FontAwesomeIcon);

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
  // Use history mode to get rid of the # in the URL
  // This requires server-side changes though to have stateless URLs (see: https://router.vuejs.org/guide/essentials/history-mode.html)
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
