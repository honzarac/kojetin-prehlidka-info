<template>
  <div id="app" class="flex flex-row h-full">
    <div class="flex flex-col bg-white basis-5/12">
      <FestivalHeader :dayName="dayName" />
      <FestivalProgram :shows="shows" :loading="loading"/>
    </div>
    <div class="basis-7/12 relative">
      <div v-if="shows.length <= 0">
        <FestivalHeader/>
      </div>
      <div v-else-if="shows.length > 0">
        <MainSlider :shows="shows"/>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from 'vue'

import './app.css'

import MainSlider from './components/MainSlider.vue'
import FestivalHeader from './components/FestivalHeader.vue'
import FestivalProgram from './components/FestivalProgram.vue'
import client from "./service/axios";

export default defineComponent({
  name: 'App',
  components: {
    FestivalProgram,
    MainSlider,
    FestivalHeader,
  },
  setup() {
    const loading = ref(false)
    const shows = ref([])
    const dayName = ref()

    const loadShows = async () => {
      loading.value = true
      try {
        const data = await client.get('/shows')
        shows.value = data.shows
        dayName.value = data.dayName
      } catch (e) {
        alert('Chyba v načítání dat');
      } finally {
        loading.value = false
      }
    }

    onMounted(async () => {
      await loadShows()
    })

    return {
      shows,
      dayName,
      loading,
    }
  },
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
