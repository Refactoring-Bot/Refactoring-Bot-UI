<template>
  <div>
    <h1>Configuration Details</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import RestClient from "./ConfigurationRestClient";

@Component({})
export default class extends Vue {
  private configuration = {};

  public async mounted() {
    // Fetch configuration from API
  }
}
</script>

<style lang="less" scoped>
</style>
