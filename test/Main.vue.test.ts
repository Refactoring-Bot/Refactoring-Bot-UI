import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";
import Main from "../src/views/Main.vue";

describe("Main.vue Component", () => {
  const localVue = createLocalVue();
  localVue.use(BootstrapVue);

  // Fontawesome setup
  localVue.component("fa-icon", FontAwesomeIcon);

  const wrapper = shallowMount(Main, {
    localVue
  });

  it("should be a vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("should contain a heading", () => {
    expect(wrapper.html()).toContain("<h1>");
  });
});
