<template>
  <div id="app" class="flex flex-row h-full">
    <router-view></router-view>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

import './app.css'
import 'animate.css'
import {RouterView} from 'vue-router';

export default defineComponent({
  name: 'App',
  components: {RouterView},
})
</script>

<style>
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 1.7vh;
    overflow: hidden;
  }
  #app {
    height: 100%;
  }
</style>
