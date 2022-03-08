<template>
  <Splide :options="{ rewind: true }">
    <SplideSlide>
      <img src="../assets/shows/sheldon/245824521_5085846968098340_2359551967150374682_n.jpg" alt="Sample 1">
    </SplideSlide>
    <SplideSlide>
      <img src="../assets/shows/sheldon/245824521_5085846968098340_2359551967150374682_n.jpg" alt="Sample 2">
    </SplideSlide>
  </Splide>
</template>

<script>
import {Splide, SplideSlide} from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/splide.min.css'

export default {
  name: 'MainSlider',
  components: {
    Splide,
    SplideSlide
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
