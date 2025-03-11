<template>
  <Transition>
    <div id="settings" v-if="openedSettings">
      <SettingsPanel
        @close="openedSettings = false"
        v-model:photo-duration="photoDuration"
        v-model:show-duration="showDuration"
        v-model:last-year-photo-duration="lastYearPhotoDuration"
      />
    </div>
  </Transition>
  <div id="app" class="flex flex-row h-full" :class="showCursor ? '' : 'no-cursor'">
    <ProgramPage
      @openSettings="openedSettings = true"
      :showDuration="showDuration"
      :photoDuration="photoDuration"
      :last-year-photo-duration="lastYearPhotoDuration"
    ></ProgramPage>
  </div>
</template>

<script setup>
import './app.css'
import 'animate.css'
import ProgramPage from "./pages/ProgramPage.vue";
import {ref} from "vue";
import SettingsPanel from "./components/SettingsPanel.vue";
import {DateTime} from "luxon";

const showDuration = ref(localStorage.getItem('showDuration') ? localStorage.getItem('showDuration') * 1000 : 50_000)
const photoDuration = ref(localStorage.getItem('photoDuration') ? localStorage.getItem('photoDuration') * 1000 : 5_000)
const lastYearPhotoDuration = ref(localStorage.getItem('lastYearPhotoDuration') ? localStorage.getItem('lastYearPhotoDuration') * 1000 : 55_000)

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

<style lang="scss">
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
  #settings {
    height: 100%;
    width: 600px;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.9);
    z-index: 99999;
    padding: 30px;
    color: white;
    &.v-enter-active,
    &.v-leave-active {
      transition: left 0.4s ease;
    }
    &.v-enter-from,
    &.v-leave-to {
      left: -600px;
    }
  }
  .no-cursor {
    cursor: none;
  }
</style>
