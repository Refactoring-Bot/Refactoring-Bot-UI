<template>
  <div>
    <h1>Configurations</h1>
    <div class="card bg-light mb-3" v-for="config in configurations" v-bind:key="config.configurationId">
      <div class="card-header">Repository: {{config.repoName}}</div>
      <div class="card-body">
        <pre class="card-text">{{JSON.stringify(config, null, 4)}}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ConfigurationRestClient } from "./ConfigurationRestClient";

@Component({})
export default class extends Vue {
  private configurations = [];

  public async mounted() {
    // Fetch configurations from API
    this.configurations = await ConfigurationRestClient.getConfigurations();
    console.log(this.configurations);
  }
}
</script>

<style lang="less" scoped>
</style>
