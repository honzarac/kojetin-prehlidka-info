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
import {ref} from "vue";
import {DateTime} from "luxon";

const showCursor = ref(true)
const openedSettings = ref(false)

const cursorLastMoved = ref(DateTime.now())
setInterval(() => {
  if (showCursor.value && DateTime.now().diff(cursorLastMoved.value, 'second').get('second') > 10) {
    showCursor.value = false
  }
}, 10000)
document.addEventListener('mousemove', () => {
  showCursor.value = true
  cursorLastMoved.value = DateTime.now()
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
    font-family: Manrope;
  }
  #app {
    height: 100%;
  }
  .no-cursor {
    cursor: none;
  }
</style>
