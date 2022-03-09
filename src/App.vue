<template>
  <div id="app" class="flex flex-row h-full">
    <div class="flex flex-col bg-white basis-5/12">
      <FestivalHeader/>
      <FestivalProgram/>
    </div>
    <div class="basis-7/12"><MainSlider/></div>
  </div>
</template>

<script>
import MainSlider from './components/MainSlider.vue'
import FestivalHeader from './components/FestivalHeader.vue'
import FestivalProgram from './components/FestivalProgram.vue'
import './app.css'

export default {
  name: 'App',
  components: {
    FestivalProgram,
    MainSlider,
    FestivalHeader,
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
