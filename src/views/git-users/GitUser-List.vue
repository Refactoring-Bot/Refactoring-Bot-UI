<template>
  <div>
    <h1>Git Users</h1>

    <b-form inline>
      <b-input-group prepend="# of entries:">
        <b-form-input v-model="configurationList.length" style="width:80px" disabled></b-form-input>
      </b-input-group>
      <b-input-group prepend="Filter:">
        <b-form-input v-model="table.filter" v-on:input="$emit('update:filter', table.filter)"></b-form-input>
        <b-input-group-append>
          <b-button variant="primary" :disabled="!table.filter" v-on:click="table.filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
      <b-button variant="success" to="/add-configuration">
        <fa-icon icon="plus-circle"></fa-icon>Add Git User
      </b-button>
      <b-button variant="primary" v-on:click="removeAll()" v-bind:disabled="configurationList.length===0">
        <fa-icon icon="trash-alt"></fa-icon>Delete all
      </b-button>
    </b-form>

    <b-table show-empty striped hover :sort-by.sync="table.sortBy" :sort-desc.sync="table.sortDesc" :items="configurationList" :fields="table.fields" :filter="table.filter">
      <template slot="name" slot-scope="row">
        <router-link v-bind:to="`/git-users/${row.item.id}`">{{row.item.name}}</router-link>
      </template>
      <template slot="actions" slot-scope="row">
        <div class="float-right">
          <!-- Edit -->
          <b-button variant="primary" size="sm" class="mr-1" v-bind:to="`/configurations/${row.item.configurationId}`">
            <fa-icon icon="edit"></fa-icon>
          </b-button>
          <!-- Delete -->
          <b-button variant="primary" size="sm" class="mr-1" v-on:click="remove(row.item.id)">
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
import RestClient from "./GitUserRestClient";

@Component({})
export default class extends Vue {
  private configurationList = [];
  private table = {
    sortBy: "configurationId",
    sortDesc: false,
    filter: "",
    fields: [
      { key: "name", sortable: true },
      { key: "email", sortable: true },
      { key: "token", sortable: true },
      { key: "actions", label: "" }
    ]
  };

  public async mounted() {
    // Fetch configurations from API
    this.configurationList = await RestClient.getGitUsers();
    console.log(this.configurationList);
  }

  // Delete a single item
  private remove(id: string) {
    alert("No yet implemented...");
  }

  // Delete all items
  private removeAll() {
    alert("No yet implemented...");
  }
}
</script>

<style lang="less" scoped>
</style>
