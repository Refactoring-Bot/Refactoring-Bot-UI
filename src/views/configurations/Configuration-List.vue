<template>
  <div>
    <h1>Configurations</h1>

    <b-form inline>
      <b-input-group prepend="# of entries:">
        <b-form-input v-model="configurationList.length" style="width:80px" disabled></b-form-input>
      </b-input-group>
      <b-input-group prepend="Filter:">
        <b-form-input v-model="table.filter"></b-form-input>
        <b-input-group-append>
          <b-button variant="primary" :disabled="!table.filter" v-on:click="table.filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
      <b-button variant="success" to="/add-configuration">
        <fa-icon icon="plus-circle"></fa-icon>
<!--        <span>Add Configuration</span>-->
      </b-button>
    </b-form>

    <b-table show-empty striped hover :sort-by.sync="table.sortBy" :sort-desc.sync="table.sortDesc" :items="configurationList" :fields="table.fields" :filter="table.filter">
      <template #cell(repoName)="row">
        <router-link v-bind:to="`/configurations/${row.item.configurationId}`">{{row.item.repoName}}</router-link>
      </template>
      <template #cell(repoService)="row">
        <a target="_blank" v-bind:href="row.item.repoGitLink">{{row.item.repoService}}</a>
      </template>
      <template #cell(actions)="row">
        <div class="float-right">
          <!-- Edit -->
          <b-button variant="primary" size="sm" class="mr-1" v-bind:to="`/configurations/${row.item.configurationId}`">
            <fa-icon icon="edit"></fa-icon>
          </b-button>
          <!-- Delete -->
          <b-button variant="primary" size="sm" class="mr-1" v-on:click="remove(row.item.configurationId)">
            <fa-icon icon="trash-alt"></fa-icon>
          </b-button>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ConfigRestClient from "./ConfigurationRestClient";
import IConfiguration from "./Configuration.interface";
import IGitUser from "../git-users/GitUser.interface";
import GitUserRestClient from "../git-users/GitUserRestClient";

@Component({})
export default class extends Vue {
  private configurationList: IConfiguration[] = [];
  private table = {
    sortBy: "botName",
    sortDesc: false,
    filter: "",
    fields: [
      { key: "botName", sortable: true, label: "Git User" },
      { key: "repoOwner", sortable: true, label: "Repository Owner" },
      { key: "repoName", sortable: true, label: "Repository Name" },
      { key: "repoService", sortable: true, label: "Repository Service" },
      { key: "analysisService", sortable: true },
      {
        key: "analysisServiceProjectKey",
        sortable: true,
        label: "Analysis Project Key"
      },
      { key: "actions", label: "" }
    ]
  };

  public async mounted() {
    this.init();
  }

  public async init() {
    // Fetch items from API
    Promise.all([
      ConfigRestClient.getConfigurations(),
      GitUserRestClient.getGitUsers()
    ]).then(res => {
      res[0].forEach(conf => {
        conf.botName = res[1].find(
            user => user.gitUserId === conf.gitUserId
        ).gitUserName;
      });
      this.configurationList = res[0];
    });
  }

  // Delete a single item
  private remove(id: number) {
    ConfigRestClient.deleteConfiguration(id).then(async () => {
      this.init();
    });
  }
}
</script>

<style lang="less" scoped>
</style>
