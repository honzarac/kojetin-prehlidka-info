<template>
  <div id="app" class="flex flex-row h-full">
    <div class="flex flex-col bg-white basis-5/12">
      <FestivalHeader :dayName="dayName" />
      <FestivalProgram :shows="shows" />
    </div>
    <div class="basis-7/12"><MainSlider/></div>
  </div>
</template>

<script>
import MainSlider from './components/MainSlider.vue'
import FestivalHeader from './components/FestivalHeader.vue'
import FestivalProgram from './components/FestivalProgram.vue'
import './app.css'
import {inject} from "vue";

export default {
  name: 'App',
  components: {
    FestivalProgram,
    MainSlider,
    FestivalHeader,
  },
  data() {
    return {shows: [], dayName: ''}
  },
  mounted() {
    const axios = inject('axios')
    axios.get('http://localhost:3001/shows')
        .then((response) => {
          this.dayName = response.data.dayName,
          this.shows = response.data.shows
        })
  }
}
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
