<template>
  <Splide :options="{ rewind: true, cover: true, height: '100vh', arrows: false, padding: 0, autoplay: true, interval: 5000 }">
    <template v-for="(item, index) in slideshowImages">
      <SplideSlide>
        <img :src="item">
      </SplideSlide>
    </template>
  </Splide>
</template>

<script>
import {Splide, SplideSlide} from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/splide.min.css'

export default {
  name: 'MainSlider',
  computed: {
    slideshowImages: () => {
      return [
        '/shows/sheldon/245824521_5085846968098340_2359551967150374682_n.jpg',
        '/shows/sheldon/246268922_5085848844764819_8293591490491303798_n.jpg',
        '/shows/sheldon/246414174_5085847621431608_4060540322586648233_n.jpg',
        '/shows/sheldon/246516738_5085849824764721_2020597678071109319_n.jpg',
        '/shows/sheldon/246625877_5085846318098405_2389649937006242802_n.jpg'
      ];
    }
  },
  components: {
    Splide,
    SplideSlide,
  }
}
</script>
