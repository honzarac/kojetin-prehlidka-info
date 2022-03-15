<template>
  <Splide :options="{
    rewind: false,
    cover: true,
    height: '100vh',
    arrows: false,
    padding: 0,
    autoplay: true,
    interval: 1000,
    speed: 1000,
  }" @splide:moved="moveToNextShow()">
    <template v-for="(photo) in shows[0].photos">
      <SplideSlide>
        <img :src="photo">
      </SplideSlide>
    </template>
  </Splide>
  <div class="absolute bottom-0 left-0 p-16 text-white w-full text-center text-3xl bg-gradient-to-b from-transparent to-black font-bold">
    {{shows[0].showName}}
  </div>
</template>

<script>
import {Splide, SplideSlide} from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import {defineComponent, ref, toRefs} from "vue";

export default defineComponent({
  name: 'MainSlider',
  props: {
    shows: {
      type: Array,
      required: true,
    }
  },
  methods: {
    moveToNextShow() {

    }
  },
  setup(props) {
    let {shows} = toRefs(props)
    let currentShow = ref(null)
    let currentShowIndex = ref(0)

    return {
      currentShow,
      currentShowIndex
    }
  },
  computed() {
    if (this.shows.length > 5) {
      alert(2)
    }
  },
  components: {
    Splide,
    SplideSlide,
  }
})
</script>

