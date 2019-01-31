<template>
  <div>
    <h1>{{pageTitle}}</h1>
    <b-container>
      <b-row>
        <b-col>
          <b-form-group label="Git User">
            <b-form-select v-model="configuration.gitUserId" :options="gitUserList" value-field="id" text-field="name" required></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Repository Service">
            <b-form-select v-model="configuration.repoService" :options="repoServiceList" required></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Repository Owner">
            <b-form-input type="text" v-model="configuration.repoOwner" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Repository Name">
            <b-form-input type="text" v-model="configuration.repoName" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Analysis Service">
            <b-form-select v-model="configuration.analysisService" :options="analysisServiceList" required></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Analysis Project Key">
            <b-form-input type="text" v-model="configuration.analysisServiceProjectKey" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group label="Maximum # of Concurrent Pull Requests">
            <b-form-input type="number" v-model="configuration.maxAmountRequests" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-form inline>
        <b-button variant="success" v-on:click="save()">
          <fa-icon icon="plus-circle"></fa-icon>
          <span>Save</span>
        </b-button>
        <b-button variant="primary" v-on:click="remove()" v-if="editMode">
          <fa-icon icon="trash-alt"></fa-icon>
          <span>Delete</span>
        </b-button>
        <b-button variant="primary" to="/configurations">
          <span>Back</span>
        </b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ConfigRestClient from "./ConfigurationRestClient";
import IConfiguration from "./Configuration.interface";
import GitUserRestClient from "../git-users/GitUserRestClient";
import IGitUser from "../git-users/GitUser.interface";

@Component({})
export default class extends Vue {
  private configuration = {} as IConfiguration;
  private pageTitle = "";
  private editMode = false;
  private gitUserList: IGitUser[] = [];
  private repoServiceList = [
    {
      value: "github",
      text: "GitHub"
    }
  ];
  private analysisServiceList = [
    {
      value: "sonarqube",
      text: "SonarQube"
    }
  ];

  public async mounted(): Promise<void> {
    // Fetch git users from API
    this.gitUserList = await GitUserRestClient.getGitUsers();
    // Add a new item or edit an existing one?
    this.editMode = this.$route.params.id && this.$route.params.id !== "";
    this.pageTitle = this.editMode
      ? "Configuration Details"
      : "Add New Configuration";

    if (this.editMode) {
      // Fetch existing configuration from API
      this.configuration = await ConfigRestClient.getConfigurationById(
        this.$route.params.id
      );
    }
  }

  public async remove(): Promise<void> {
    alert("Not yet implemented...");
  }

  public async save(): Promise<void> {
    if (this.editMode) {
      // Update existing item
    } else {
      // Create new item
    }
  }
}
</script>

<style lang="less" scoped>
</style>
