<template>
  <div>
    <h1>Overview</h1>
    <p>This UI can be used for the management and configuration of a RefactoringBot instance.</p>
    <p>Current API usage: {{apiEndpoint}}</p>
    <p>Status: {{status}}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { config } from "../config";
import axios from "axios";

@Component({})
export default class extends Vue {
  private apiEndpoint: string = config.apiEndpoint;
  private status = "";

  public mounted() {
    axios
      .get(`${this.apiEndpoint}/v2/api-docs`)
      .then(res => {
        this.status = "OK";
      })
      .catch(res => {
        this.status = "Unavailable";
      });
  }
}
</script>

<style lang="less" scoped>
</style>
