<template>
  <div class="flex flex-row h-full">
    <div class="basis-4/12 bg-blue">
      <FestivalHeader/>
      <FestivalProgram/>
    </div>
    <div class="basis-8/12"><MainSlider/></div>
  </div>
</template>

<script>
import MainSlider from './components/MainSlider.vue'
import FestivalHeader from './components/FestivalHeader.vue'
import FestivalProgram from "./components/FestivalProgram.vue";
import './app.css'

export default {
  name: 'App',
  components: {
    MainSlider,
    FestivalHeader,
    FestivalProgram,
  }
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
