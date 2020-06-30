<template>
    <b-container class="tab-content" fluid>

        <b-list-group class="event-group">
            <div class="update-header">
                <p>Last updated: {{lastUpdate | customDateFilter}}</p>
                <b-button variant="primary" style="float:right;"
                          @click.prevent="fetchEvents(configuration.configurationId)">
                    Update Events
                </b-button>
            </div>
            <b-list-group-item class="" v-for="event in events" :key="'event-' + event.id">
                <!--  Pull Request Events  -->
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
                            <div :class="eventItemStatus(event)">{{event.payload.pull_request.state}}
                                <span class="font-weight-bold">Pull Request</span></div>
                            <div class="event-item-time">
                                <div v-if="event.payload.pull_request.merged_at !== null">
                                    merged
                                    <time v-b-tooltip :title="event.payload.pull_request.merged_at | customDateFilter"  :datetime="event.payload.pull_request.merged_at">
                                        {{event.payload.pull_request.merged_at | timeFromNow}}
                                    </time>
                                </div>
                                <div v-else-if="event.payload.pull_request.closed_at !== null">
                                    closed
                                    <time v-b-tooltip :title="event.payload.pull_request.closed_at | customDateFilter" :datetime="event.payload.pull_request.closed_at">
                                        {{event.payload.pull_request.closed_at | timeFromNow}}
                                    </time>
                                </div>
                                <div v-else-if="event.payload.pull_request.updated_at !== null">
                                    updated
                                    <time v-b-tooltip :title="event.payload.pull_request.updated_at | customDateFilter"
                                          :datetime="event.payload.pull_request.updated_at">
                                        {{event.payload.pull_request.updated_at | timeFromNow}}
                                    </time>
                                </div>
                                <div v-else-if="event.payload.pull_request.created_at !== null">
                                    created
                                    <time v-b-tooltip :title="event.payload.pull_request.created_at| customDateFilter"
                                          :datetime="event.payload.pull_request.created_at">
                                        {{event.payload.pull_request.created_at | timeFromNow}}
                                    </time>
                                </div>
                            </div>
                            <div class="event-item-actor">by <a
                                :href="event.payload.pull_request.user.html_url"
                                target="_blank">{{event.actor.login}}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!--  Issue Comment Events  -->
                <div v-else-if="event.type === eventTypes[1]">
                    <div>
                        <div class="event-item-actor"><a :href="event.payload.comment.user.html_url"
                                                         target="_blank"> {{event.actor.login}}</a>
                        </div>
                        <div class="event-item-time">
                            <div v-if="event.payload.comment.created_at !== null">
                                commented

                                <time v-b-tooltip :title="event.payload.comment.created_at | customDateFilter" :datetime="event.payload.comment.created_at">
                                    {{event.payload.comment.created_at | timeFromNow}}
                                </time>
                            </div>
                        </div>
                        <blockquote class="event-item-comment"><p>{{event.payload.comment.body}}</p>
                        </blockquote>
                        <div>in <a :href="event.payload.issue.html_url"
                                   target="_blank">{{event.payload.issue.title}}</a>
                        </div>
                    </div>
                </div>
            </b-list-group-item>
        </b-list-group>


    </b-container>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import IConfiguration from "../../views/configurations/Configuration.interface";
    import IGitUser from "../../views/git-users/GitUser.interface";
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
        @Prop() configuration: IConfiguration;
        private gitUser = {} as IGitUser;
        private events = [];
        private eventTypes = ["PullRequestEvent", "IssueCommentEvent"];
        private lastUpdate = "";

        public async mounted() {
            await this.init();
        }

        public async init() {
            // Fetch items from API
            await this.fetchEvents(this.configuration.configurationId);
        }

        eventFilter(events) {
            if ((this.eventTypes[0] === events.type) && (events.actor.login === this.configuration.botName)) {
                return (events.type);
            }
            if ((this.eventTypes[1]) === events.type && ((events.actor.login === this.configuration.botName) || (events.payload.issue.user.login === this.configuration.botName))){
                return (events.type);
            }
        }

        public async fetchEvents(configId) {
            this.events = await TimelineRestClient.getConfigEvents(configId);
            this.events = this.events.filter(this.eventFilter);
            this.lastUpdate = new Date().toISOString();
            this.$bvToast.toast('Events are updated', {
                variant: 'primary',
                toaster: 'b-toaster-top-center',
                autoHideDelay: 1800
            })
        }

        eventItemStatus(event) {
            switch (event.payload.pull_request.state){
                case "closed": {
                    return "event-item-state--closed";
                }
                case "open": {
                    return "event-item-state--open";
                }
                case "merged": {
                    return "event-item-state--merged"
                }
            }
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
        &-state {
            &--closed {
                color: red;
            }

            &--open {
                color: dodgerblue;
            }

            &--merged {
                color: green;
            }
        }

        &-time, &-status, &-actor {
            display: inline-block;
        }

        &-comment {
            background: #f9f9f9;
            border-left: 10px solid #ccc;
            padding: 5px;
            font-size: 12pt;
        }
    }
</style>
