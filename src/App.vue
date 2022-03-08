<template>
  <layout>
    <MainSlider/>
  </layout>
</template>

<script>
import MainSlider from './components/MainSlider.vue'

export default {
  name: 'App',
  components: {
    MainSlider
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
