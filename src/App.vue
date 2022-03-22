<template>
  <div id="app" class="flex flex-row h-full">
    <ProgramPage/>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

import './app.css'
import 'animate.css'
import ProgramPage from './pages/ProgramPage.vue';

export default defineComponent({
  name: 'App',
  components: {ProgramPage},
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
    max-height: 100vh;
  }
</style>
