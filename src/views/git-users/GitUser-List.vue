<template>
  <div>
    <h1>Git Users</h1>

    <b-form inline>
      <b-input-group prepend="# of entries:">
        <b-form-input v-model="gitUserList.length" style="width:80px" disabled></b-form-input>
      </b-input-group>
      <b-input-group prepend="Filter:">
        <b-form-input v-model="table.filter"></b-form-input>
        <b-input-group-append>
          <b-button variant="primary" :disabled="!table.filter" v-on:click="table.filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
      <b-button variant="success" to="/add-git-user">
        <fa-icon icon="plus-circle"></fa-icon>
        <span>Add Git User</span>
      </b-button>
    </b-form>

    <b-table show-empty striped hover :sort-by.sync="table.sortBy" :sort-desc.sync="table.sortDesc" :items="gitUserList" :fields="table.fields" :filter="table.filter">
      <template #cell(gitUserName)="row">
        <router-link v-bind:to="`/git-users/${row.item.gitUserId}`">{{row.item.gitUserName}}</router-link>
      </template>

        <template #cell(actions)="row">
        <div class="float-right">
          <!-- Edit -->
          <b-button variant="primary" size="sm" class="mr-1" v-bind:to="`/git-users/${row.item.gitUserId}`">
            <fa-icon icon="edit"></fa-icon>
          </b-button>
          <!-- Delete -->
          <b-button variant="primary" size="sm" class="mr-1" v-on:click="remove(row.item.gitUserId)">
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
import GitUserRestClient from "./GitUserRestClient";
import IGitUser from "./GitUser.interface";

@Component({})
export default class extends Vue {
  private gitUserList: IGitUser[] = [];
  private table = {
    sortBy: "gitUserName",
    sortDesc: false,
    filter: "",
    fields: [
      { key: "gitUserId", sortable: true },
      { key: "gitUserName", sortable: true },
      { key: "gitUserEmail", sortable: true },
      { key: "repoService", sortable: true, label: "Repository Service" },
      { key: "actions", label: "" }
    ]
  };

  public async mounted() {
    // Fetch git users from API
    this.gitUserList = await GitUserRestClient.getGitUsers();
  }

  // Delete a single item
  private remove(id: number) {
    GitUserRestClient.deleteGitUser(id).then(async () => {
      this.gitUserList = await GitUserRestClient.getGitUsers();
    });
  }
}
</script>

<style lang="less" scoped>
</style>
