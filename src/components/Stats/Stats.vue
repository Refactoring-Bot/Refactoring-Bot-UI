<template>
    <div>Test {{amountOpenPullRequest}}</div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import IConfiguration from "../../views/configurations/Configuration.interface";
    import ConfigRestClient from "../../views/configurations/ConfigurationRestClient";
    import GitUserRestClient from "../../views/git-users/GitUserRestClient";
    import StatsRestClient from "./StatsRestClient";

    @Component({})
    export default class Stats extends Vue {
        private configurationList: IConfiguration[] = [];
        private amountOpenPullRequest;

        public async mounted() {
            this.init();
            await this.getOpenPullRequests(48);
        }

        public async init() {
            // Fetch items from API
            Promise.all([
                ConfigRestClient.getConfigurations(),
                GitUserRestClient.getGitUsers(),
            ]).then(res => {
                this.configurationList = res[0];
            });
        }

        public async getOpenPullRequests(configId) {
            let stats = await StatsRestClient.getAmountOpenPullRequest(configId);
            this.amountOpenPullRequest = stats.amount;
        }

    }
</script>

<style scoped>

</style>
