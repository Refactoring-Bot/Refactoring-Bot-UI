import ConfigDetailView from "./views/configurations/Configuration-Detail.vue";
import ConfigListView from "./views/configurations/Configuration-List.vue";
import DashboardView from "./views/dashboard/Dashboard.vue";
import GitUserDetailView from "./views/git-users/GitUser-Detail.vue";
import GitUserListView from "./views/git-users/GitUser-List.vue";
import MainView from "./views/Main.vue";

export default [
  {
    path: "/",
    component: MainView
  },
  {
    path: "/dashboard",
    component: DashboardView
  },
  {
    path: "/git-users",
    component: GitUserListView
  },
  {
    path: "/git-users/:id",
    component: GitUserDetailView
  },
  {
    path: "/add-git-user",
    component: GitUserDetailView
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
