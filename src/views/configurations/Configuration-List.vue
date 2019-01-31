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
        <fa-icon icon="plus-circle"></fa-icon>Add Configuration
      </b-button>
      <b-button variant="primary" v-on:click="removeAll()" v-bind:disabled="configurationList.length===0">
        <fa-icon icon="trash-alt"></fa-icon>Delete all
      </b-button>
    </b-form>

    <b-table show-empty striped hover :sort-by.sync="table.sortBy" :sort-desc.sync="table.sortDesc" :items="configurationList" :fields="table.fields" :filter="table.filter">
      <template slot="repoName" slot-scope="row">
        <router-link v-bind:to="`/configurations/${row.item.configurationId}`">{{row.item.repoName}}</router-link>
      </template>
      <template slot="repoService" slot-scope="row">
        <a target="_blank" v-bind:href="row.item.repoGitLink">{{row.item.repoService}}</a>
      </template>
      <template slot="actions" slot-scope="row">
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

@Component({})
export default class extends Vue {
  private configurationList: IConfiguration[] = [];
  private table = {
    sortBy: "repoOwner",
    sortDesc: false,
    filter: "",
    fields: [
      { key: "repoOwner", sortable: true, label: "Repository Owner" },
      { key: "repoName", sortable: true, label: "Repository Name" },
      { key: "repoService", sortable: true, label: "Repository Service" },
      { key: "analysisService", sortable: true },
      {
        key: "analysisServiceProjectKey",
        sortable: true,
        lable: "Analysis Project Key"
      },
      { key: "actions", label: "" }
    ]
  };

  public async mounted() {
    // Fetch configurations from API
    this.configurationList = await ConfigRestClient.getConfigurations();
  }

  // Delete a single item
  private remove(id: number) {
    ConfigRestClient.deleteConfiguration(id).then(async () => {
      this.configurationList = await ConfigRestClient.getConfigurations();
    });
  }

  // Delete all items
  private removeAll() {
    alert("No yet implemented...");
  }
}
</script>

<style lang="less" scoped>
</style>
