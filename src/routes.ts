import ConfigListView from "./views/configurations/Configuration-List.vue";
import IssueListView from "./views/issues/Issue-List.vue";
import MainView from "./views/Main.vue";

export default [
  {
    name: "Home",
    path: "/",
    component: MainView
  },
  {
    name: "Configurations",
    path: "/configurations",
    component: ConfigListView
  },
  {
    name: "Issues",
    path: "/issues",
    component: IssueListView
  }
];
