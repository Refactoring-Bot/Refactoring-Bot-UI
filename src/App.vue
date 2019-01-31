<template>
  <div class="everything">
    <header class="header">
      <b-navbar class="bg-primary" toggleable="md" fixed="top" variant="faded" type="dark">
        <b-navbar-toggle target="nav_collapse" position="left"></b-navbar-toggle>
        <b-navbar-brand to="/">
          <span>
            <!-- <img src="../imgs/logo.png" alt="Logo"> -->
            {{appTitle}}
          </span>
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item to="/git-users">Git Users</b-nav-item>
            <b-nav-item to="/configurations">Configurations</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" right></b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <div class="wrapper">
      <section class="content">
        <router-view></router-view>
      </section>
    </div>
    <footer class="footer bg-primary text-light">
      <div class="container-fluid">
        <p>Last updated: {{footer.buildDate}}</p>
        <p>Version: {{footer.version}}</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import config from "./config";

@Component({})
export default class extends Vue {
  private appTitle = config.appTitle;
  private footer = {
    buildDate: config.buildDate,
    version: config.version
  };
}
</script>

<style lang="less">
@-ms-viewport {
  width: auto !important;
}

html,
body,
.everything {
  height: 100%;
  margin: 0;
  padding: 0;
}

.footer {
  clear: both;
  position: relative;
  margin-top: -135px;
  height: 135px;
  margin-bottom: 0;
  padding: 15px;
  font-size: 16px;
}

.header nav {
  .navbar-brand span {
    display: table-cell;
    img {
      vertical-align: middle;
      margin-bottom: 4px;
      max-height: 20px;
      border: 1px solid transparent;
    }
  }
  .navbar-brand,
  .navbar-toggler {
    border: 1px solid transparent;
    span:hover,
    img:hover {
      border-color: transparent;
    }
  }
}

.wrapper {
  min-height: 100%;
  .content {
    overflow: auto;
    padding: 90px 20px 135px;
  }
}

.form-inline {
  margin: 15px 0;
  > * {
    margin: 0 2px;
  }
}
</style>
