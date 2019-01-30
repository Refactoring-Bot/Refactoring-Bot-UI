import ConfigDetailView from "./views/configurations/Configuration-Detail.vue";
import ConfigListView from "./views/configurations/Configuration-List.vue";
import GitUserListView from "./views/git-users/GitUser-List.vue";
import MainView from "./views/Main.vue";

export default [
  {
    path: "/",
    component: MainView
  },
  {
    path: "/git-users",
    component: GitUserListView
  },
  {
    path: "/configurations",
    component: ConfigListView
  },
  {
    path: "/configurations/:id",
    component: ConfigDetailView
  },
  {
    path: "/add-configuration",
    component: ConfigDetailView
  }
];
