<template>
    <div>Open Pull Requests from Bot: {{amountOpenPullRequest}} / {{totalOpenPullRequest}} </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import IConfiguration from "../../views/configurations/Configuration.interface";
    import StatsRestClient from "./StatsRestClient";

    @Component({})
    export default class Stats extends Vue {
        @Prop() configuration: IConfiguration;
        private amountOpenPullRequest = "";
        private totalOpenPullRequest = "";

        public async mounted() {
            await this.getOpenPullRequests(this.configuration.configurationId);
        }

        public async getOpenPullRequests(configId) {
            let stats = await StatsRestClient.getAmountOpenPullRequest(configId);
            this.amountOpenPullRequest = stats.amount;
            this.totalOpenPullRequest = stats.total;
        }

    }
</script>

<style scoped>

</style>
