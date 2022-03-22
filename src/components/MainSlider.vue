<template>
  <Splide :ref="splide" :options="{
    rewind: false,
    cover: true,
    height: '100vh',
    arrows: false,
    padding: 0,
    autoplay: true,
    interval: 4000,
    speed: 1000,
    direction: 'ttb',
    pagination: false,
    pauseOnHover: false,
  }" @splide:active="activeChanged">
      <SplideSlide v-if="withProgramSlide">
        <img src="http://localhost:3001/static/plakat-2020w.jpg">
      </SplideSlide>
      <template v-for="(photo) in photos">
        <SplideSlide>
          <img :src="photo.url" v-bind:alt="photo.showName">
        </SplideSlide>
      </template>
  </Splide>
  <div v-if="currentShowName !== ''" class="absolute bottom-0 left-0 pt-24 px-16 pb-8 text-white w-full text-center text-3xl bg-gradient-to-b from-transparent to-black font-bold animate__animated animate__slideInUp">
    {{currentShowName}}
  </div>
</template>

<script>
import {Splide, SplideSlide} from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import {defineComponent, ref, toRefs} from "vue";

export default defineComponent({
  name: 'MainSlider',
  props: {
    photos: {
      type: Array,
      required: true,
    },
    withProgramSlide: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    activeChanged(splide, currentSlide) {
      this.currentShowName = currentSlide.slide.childNodes[1].alt
      if ((splide.length-1) === currentSlide.index) {
        this.emitEndToParent()
      }
    },
    emitEndToParent: function() {
      this.$emit('end-of-slides')
    }
  },
  setup() {
    let splide = ref()
    let currentShowName = ref(null)

    return {
      splide,
      currentShowName,
    }
  },
  components: {
    Splide,
    SplideSlide,
  }
})
</script>

