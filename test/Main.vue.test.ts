import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";
import config from "../src/config";
import Main from "../src/views/Main.vue";

// Add fontawesome icons
library.add(fas);
// Wrapper object for the component
let wrapper: Wrapper<any>;

describe("Main.vue Component", () => {
    beforeAll(() => {
        // Mock API resource
        const mock = new MockAdapter(axios);
        mock.onGet(`${config.apiEndpoint}/v2/api-docs`).reply(200, {});

        // Create local vue
        const localVue = createLocalVue();
        localVue.use(BootstrapVue);

        // Fontawesome setup
        localVue.component("fa-icon", FontAwesomeIcon);

        // VueRouter setup
        localVue.use(VueRouter);
        const router = new VueRouter();

        wrapper = mount(Main, {
            localVue,
            router
        });
    });

    it("should be a vue instance", () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it("should contain the API endpoint", () => {
        expect(wrapper.html()).toContain(config.apiEndpoint);
    });

    it("should display API status OK", () => {
        expect(wrapper.html()).toContain("Status: OK");
        expect(wrapper.html()).toContain("fa-check-circle");
    });
});
