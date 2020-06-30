<template>
  <div>
    <h1>{{pageTitle}}</h1>
    <b-container>
      <b-row>
        <b-col>
          <b-form-group label="Git User">
            <b-form-select v-model="configuration.gitUserId" :options="gitUserList" value-field="gitUserId" text-field="gitUserName" required></b-form-select>
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
              <a href="https://sonarcloud.io/dashboard?id=Bot-Playground%3ABot-Playground" target="_blank" v-if="configuration.analysisService === analysisServiceList[0].value">Example Analysis Project</a>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group label="Maximum Amount of Concurrent Pull Requests" description="How many pull requests can be opened at the same time?">
            <b-form-input type="number" v-model="configuration.maxAmountRequests" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-form inline>
        <b-button variant="success" v-on:click="save()">
          <fa-icon icon="save"></fa-icon>
          <span>Save</span>
        </b-button>
        <b-button variant="danger" v-on:click="remove()" v-if="editMode">
          <fa-icon icon="trash-alt"></fa-icon>
          <span>Delete</span>
        </b-button>
        <b-button variant="secondary" to="/configurations">
          <span>Back</span>
        </b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import IGitUser from "../git-users/GitUser.interface";
    import GitUserRestClient from "../git-users/GitUserRestClient";
    import IConfiguration from "./Configuration.interface";
    import ConfigRestClient from "./ConfigurationRestClient";

    @Component({})
export default class extends Vue {
  private analysisServiceList = [
      {
            value: "sonarqube",
            text: "SonarQube"
      }
  ];
  private gitUser = {} as IGitUser;
  private pageTitle = "";
  private editMode = false;
  private gitUserList: IGitUser[] = [];
  private configuration = {
        analysisService : this.analysisServiceList[0].value,
        analysisServiceProjectKey : "Bot-Playground:Bot-Playground",
        maxAmountRequests : 5
  } as IConfiguration;

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
    let ask = window.confirm("Are you sure you want to delete this configuration?")
    if (ask) {
      ConfigRestClient.deleteConfiguration(
        this.configuration.configurationId
      ).then(() => {
        this.$router.push("/configurations");
      });
    }
  }

  public async save(): Promise<void> {
    // Update existing item or create new item?
      const promise = this.editMode
          ? ConfigRestClient.updateConfiguration(this.configuration)
          : ConfigRestClient.createConfiguration(this.configuration);

      promise
          .then(() => {
              this.$bvToast.toast('Configuration successfully saved!', {
                  variant: 'primary',
                  toaster: 'b-toaster-top-center',
                  autoHideDelay: 1800
              })
              if (this.editMode) {
                  this.$router.push("/configurations");
              }
          })
      .catch(res => {
        console.log(res);
        alert(`Errors while saving configuration: ${res.response.data}`);
      });
  }
}
</script>

<style lang="less" scoped>
</style>
