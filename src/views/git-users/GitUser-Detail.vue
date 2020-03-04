<template>
  <div>
    <h1>{{pageTitle}}</h1>
    <b-container>
      <b-row>
        <b-col>
          <b-form-group label="User Name">
            <b-form-input type="text" v-model="gitUser.gitUserName" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Email">
            <b-form-input type="email" v-model="gitUser.gitUserEmail" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    <b-row>
        <b-col>
            <b-form-group label="Repository Service">
                <b-form-select v-model="gitUser.repoService" :options="repoServiceList" required></b-form-select>
            </b-form-group>
        </b-col>
    </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Token">
            <b-form-input type="text" v-model="gitUser.gitUserToken" required></b-form-input>
              <a href="https://github.com/settings/tokens" target="_blank">Generate a token with all access</a>
          </b-form-group>
        </b-col>
      </b-row>
      <b-form inline>
        <b-button variant="success" v-on:click="save()">
          <fa-icon icon="save"></fa-icon>
          <span>Save</span>
        </b-button>
        <b-button variant="primary" v-on:click="remove()" v-if="editMode">
          <fa-icon icon="trash-alt"></fa-icon>
          <span>Delete</span>
        </b-button>
        <b-button variant="primary" to="/git-users">
          <span>Back</span>
        </b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import IGitUser from "./GitUser.interface";
import GitUserRestClient from "../git-users/GitUserRestClient";

@Component({})
export default class extends Vue {
  private gitUser = {} as IGitUser;
  private pageTitle = "";
  private editMode = false;
  private repoServiceList = [
      {
          value: "github",
          text: "GitHub"
      }
  ];

  public async mounted(): Promise<void> {
    // Add a new item or edit an existing one?
    this.editMode = this.$route.params.id && this.$route.params.id !== "";
    this.pageTitle = this.editMode ? "Git User Details" : "Add New Git User";

    if (this.editMode) {
      // Fetch existing git user from API
      this.gitUser = await GitUserRestClient.getGitUserById(
        this.$route.params.id
      );
    }
  }

  public async remove(): Promise<void> {
    GitUserRestClient.deleteGitUser(this.gitUser.gitUserId).then(() => {
      this.$router.push("/git-users");
    });
  }

  public async save(): Promise<void> {
    // Update existing item or create new item?
    const promise = this.editMode
      ? GitUserRestClient.updateGitUser(this.gitUser)
      : GitUserRestClient.createGitUser(this.gitUser);

      promise
      .then(() => {
        alert("Git user successfully saved!");
        if (this.editMode) {
           this.$router.push("/git-users");
        }
      })

      .catch(res => {
        console.log(res);
        alert(`Errors while saving git user: ${res.response.data}`);
      });
  }
}
</script>

<style lang="less" scoped>
</style>
