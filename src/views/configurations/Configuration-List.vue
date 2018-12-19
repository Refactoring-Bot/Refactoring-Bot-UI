<template>
  <div>
    <h1>Configurations</h1>
    <ul>
      <li v-for="config in configurations" v-bind:key="config.configurationId">{{config.repoName}}</li>
    </ul>
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
