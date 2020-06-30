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
          <b-form-group label="Token" description="Please login and generate a token with all scopes ">
            <b-form-input type="text" v-model="gitUser.gitUserToken" required></b-form-input>
            <div v-if="gitUser.repoService === repoServiceList[0].value">
              <strong>Note:</strong><br>
              Create a token <a href="https://github.com/settings/tokens" target="_blank">here</a>
            </div>
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
        <b-button variant="secondary" to="/git-users">
          <span>Back</span>
        </b-button>
        <b-button variant="primary" to="/add-configuration">
          <span>Add a configuration</span>
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
   private repoServiceList = [
        {
            value: "github",
            text: "GitHub"
        }
   ];
  private gitUser = {
      repoService: this.repoServiceList[0].value
  } as IGitUser;
  private pageTitle = "";
  private editMode = false;

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
    let ask = window.confirm("Are you sure you want to delete this configuration?")
    if (ask) {
      GitUserRestClient.deleteGitUser(this.gitUser.gitUserId).then(() => {
          this.$router.push("/git-users");
      });
    }
  }

  public async save(): Promise<void> {
    // Update existing item or create new item?
    const promise = this.editMode
      ? GitUserRestClient.updateGitUser(this.gitUser)
      : GitUserRestClient.createGitUser(this.gitUser);

      promise
      .then(() => {
          this.$bvToast.toast('Git user successfully saved!', {
              variant: 'primary',
              toaster: 'b-toaster-top-center',
              autoHideDelay: 1800
          })
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
