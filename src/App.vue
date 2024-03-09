<template>
  <div id="app" class="flex flex-row h-full" :class="showCursor ? '' : 'no-cursor'">
    <ProgramPage></ProgramPage>
  </div>
</template>

<script setup>
import './app.css'
import 'animate.css'
import {RouterView} from 'vue-router';
import Settings from "./Settings";
import ProgramPage from "./pages/ProgramPage.vue";

const showCursor = Settings.showCursor
</script>

<style>
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 1.7vh;
    overflow: hidden;
    font-family: Manrope;
  }
  #app {
    height: 100%;
  }
  .no-cursor {
    cursor: none;
  }
</style>
