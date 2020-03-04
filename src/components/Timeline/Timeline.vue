<template>
    <div id="dashboard">
        <b-tabs :lazy="true">
            <b-tab :title="config.repoOwner + '/' + config.repoName" v-for="config in configurationList"
                   :key="'tab-'+ config.configurationId"
                   @click.prevent="fetchEvents(config.gitUserId, config.configurationId)">
                <b-container class="tab-content" fluid>
                    <b-row>
                        <b-col cols="8" class="timeline" id="timeline">
                            <b-list-group class="event-group">
                                <div class="update-header">
                                    <p>Last updated: {{lastUpdate | customDateFilter}}</p>
                                    <b-button variant="primary" style="float:right;"
                                              @click.prevent="fetchEvents(config.gitUserId, config.configurationId)">
                                        Update Events
                                    </b-button>
                                </div>
                                <b-list-group-item class="" v-for="event in events" :key="'event-' + event.id">
                                    <div v-if="event.type === eventTypes[0]">
                                        <div>
                                            <div class="event-item-header">
                                                <div class="event-item-header-title h5">
                                                    <a :href="event.payload.pull_request._links.html.href"
                                                       target="_blank">
                                                        {{event.payload.pull_request.title}}
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="event-body">
                                                <div class="event-item-status">{{event.payload.pull_request.state}}
                                                    <span class="font-weight-bold">Pull Request</span></div>
                                                <div class="event-item-time">
                                                    <div v-if="event.payload.pull_request.merged_at !== null">
                                                        merged
                                                        <time :datetime="event.payload.pull_request.merged_at">
                                                            {{event.payload.pull_request.merged_at | timeFromNow}}
                                                        </time>
                                                    </div>
                                                    <div v-else-if="event.payload.pull_request.closed_at !== null">
                                                        closed
                                                        <time :datetime="event.payload.pull_request.closed_at">
                                                            {{event.payload.pull_request.closed_at | timeFromNow}}
                                                        </time>
                                                    </div>
                                                    <div v-else-if="event.payload.pull_request.updated_at !== null">
                                                        updated
                                                        <time
                                                            :datetime="event.payload.pull_request.updated_at">
                                                            {{event.payload.pull_request.updated_at | timeFromNow}}
                                                        </time>
                                                    </div>
                                                    <div v-else-if="event.payload.pull_request.created_at !== null">
                                                        created
                                                        <time
                                                            :datetime="event.payload.pull_request.created_at">
                                                            {{event.payload.pull_request.created_at | timeFromNow}}
                                                        </time>
                                                    </div>
                                                </div>
                                                <div class="event-item-actor">by <a
                                                    :href="event.payload.pull_request.user.html_url" target="_blank">{{event.actor.login}}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="event.type === eventTypes[1]">
                                        <div>
                                            <div class="event-item-actor"><a :href="event.payload.issue.user.html_url"
                                                                             target="_blank"> {{event.actor.login}}</a>
                                            </div>
                                            <div class="event-item-time">
                                                <div v-if="event.payload.comment.created_at !== null">
                                                    commented

                                                    <time :datetime="event.payload.comment.created_at">
                                                        {{event.payload.comment.created_at | timeFromNow}}
                                                    </time>
                                                </div>
                                            </div>
                                            <blockquote class="event-item-comment"><p>{{event.payload.comment.body}}</p>
                                            </blockquote>
                                            <div>in <a :href="event.payload.comment.html_url" target="_blank">{{event.payload.issue.title}}</a>
                                            </div>
                                        </div>
                                    </div>
                                </b-list-group-item>
                            </b-list-group>
                        </b-col>
                        <b-col>
                            <b-button variant="secondary" style="display:inline-block;"
                                      @click.prevent="startRefactoring(config.configurationId)">
                                Start Refactoring
                            </b-button>
                        </b-col>
                    </b-row>
                </b-container>
                <b-container>

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

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import IConfiguration from "../../views/configurations/Configuration.interface";
    import ConfigRestClient from "../../views/configurations/ConfigurationRestClient";
    import IGitUser from "../../views/git-users/GitUser.interface";
    import GitUserRestClient from "../../views/git-users/GitUserRestClient";
    import TimelineRestClient from "./TimelineRestClient";

    @Component({
        filters: {
            author: function (v) {
                const newline = v.indexOf("\n");
                return newline > 0 ? v.slice(0, newline) : v;
            }
        }
    })
    export default class Timeline extends Vue {
        private configurationList: IConfiguration[] = [];
        private configuration = {} as IConfiguration;
        private gitUser = {} as IGitUser;
        private events = [];
        private eventTypes = ["PullRequestEvent", "IssueCommentEvent"];
        private lastUpdate;

        public async mounted() {
            this.init();
        }

        public async init() {
            // Fetch items from API
            Promise.all([
                ConfigRestClient.getConfigurations(),
                GitUserRestClient.getGitUsers(),
            ]).then(res => {
                this.configurationList = res[0];
                this.fetchEvents(this.configurationList[0].gitUserId, this.configurationList[0].configurationId);
            });
        }

        eventFilter(events) {
            if (this.eventTypes.includes(events.type)) {
                if ((events.actor.login === this.configuration.botName) && (events.repo.name === this.configuration.repoOwner + "/" + this.configuration.repoName)) {
                    return (events.type);
                }
            }
        }

        public async fetchEvents(gitUserId, configId) {
            this.configuration = await ConfigRestClient.getConfigurationById(configId);
            this.events = await TimelineRestClient.getUserEvents(gitUserId);
            this.events = this.events.filter(this.eventFilter);
            this.lastUpdate = new Date().toISOString();
        }

        public async startRefactoring(configId): Promise<void> {
            alert("Refactoring with Analysis Service started");
            await TimelineRestClient.refactorWithAnalysisService(configId);
        }
    }
</script>

<style lang="less" scoped>

    .tab-content {
        padding-top: 15px;
    }

    .update-header {
        align-self: flex-end;
        padding-right: 10px;
    }

    .event-group {
        overflow-y: auto;
        max-height: 50vh;
    }

    .event-item {
        &-time, &-status, &-actor {
            display: inline-block;
        }

        &-comment {
            background: #f9f9f9;
            border-left: 10px solid #ccc;
            padding: 0.5em 10px;
            font-size: 16pt;
        }
    }
</style>
