<template>
    <div>
        <h1>Dashboard</h1>
        <template>
            <div id="dashboard">
                <b-tabs :lazy="true">
                    <b-tab :title="config.botName + '/' + config.repoName" v-for="config in configurationList"
                           :key="'tab-'+ config.configurationId">
                        <b-container class="tab-content" fluid>
                            <b-row>
                                <b-col cols="8">
                                    <Timeline ref="timelineChild" :configuration="config"></Timeline>
                                </b-col>
                                <b-col>
                                    <b-card>
                                    <Stats ref="statsChild" :configuration="config">Test</Stats>
                                    <b-button variant="warning" style="display:inline-block;"
                                              @click.prevent="startRefactoring(config.configurationId)">
                                        Start Refactoring
                                    </b-button>
                                    </b-card>
                                </b-col>
                            </b-row>
                        </b-container>
                    </b-tab>


                    <!-- Add Configuration Button (Using tabs-end slot) -->
                    <template #tabs-end>
                        <b-button variant="success" to="/add-configuration">
                            <fa-icon icon="plus-circle"></fa-icon>
                            <span>Add Configuration</span>
                        </b-button>
                    </template>

                    <template #empty>
                        <div class="text-center text-muted">
                            There are no configurations<br>
                            Add a new configuration using the
                            <fa-icon icon="plus-circle"></fa-icon>
                            button above.
                        </div>
                    </template>
                </b-tabs>
            </div>
        </template>

    </div>
</template>

<script lang="ts">
    import {Vue, Component, Ref} from "vue-property-decorator";
    import Stats from "../../components/Stats/Stats.vue";
    import Timeline from "../../components/Timeline/Timeline.vue";
    import TimelineRestClient from "../../components/Timeline/TimelineRestClient";
    import IConfiguration from "../../views/configurations/Configuration.interface";
    import ConfigRestClient from "../../views/configurations/ConfigurationRestClient";
    import GitUserRestClient from "../../views/git-users/GitUserRestClient";
    import DashboardRestClient from "./DashboardRestClient";

    @Component({
        components: {
            Timeline,
            Stats
        }
    })
    export default class Dashboard extends Vue {
        $refs!: {
            timelineChild: Timeline,
            statsChild: Stats
        };
        public config = {} as IConfiguration;
        private configurationList: IConfiguration[] = [];

        public async mounted() {
            await this.init();
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

        public async startRefactoring(configId): Promise<void> {
            this.$bvToast.toast('Refactoring started', {
                        variant: 'success',
                        toaster: 'b-toaster-top-center',
                        autoHideDelay: 1800
            })
            await DashboardRestClient.refactorWithAnalysisService(configId).then(() => {
                this.$refs.timelineChild[0].fetchEvents(configId);
            });
        }
    };
</script>


<style scoped>

</style>
