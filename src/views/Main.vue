<template>
  <div>
    <h1>Overview</h1>
    <p>This UI can be used for the management and configuration of a RefactoringBot instance.</p>
    <p>API endpoint in use: {{apiEndpoint}}</p>
    <p>
      Status: {{status}}
      <fa-icon class="available" v-if="status==='OK'" icon="check-circle"></fa-icon>
      <fa-icon class="unavailable" v-if="status==='Unavailable'" icon="exclamation-triangle"></fa-icon>
    </p>
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
.available {
  color: green;
}

.unavailable {
  color: red;
}
</style>
