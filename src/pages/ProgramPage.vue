<template>
  <div class="icon">
    <img src="/logo.png">
    <h2>DIVADELNÍ KOJETÍN<br><b>2022</b></h2>
  </div>
  <div class="slideshow">
    <SlideShowItem :show="shows[currentShowIndex]" :autoplay="autoplay" v-if="!loading"></SlideShowItem>
  </div>
</template>

<script>
  import {defineComponent, onMounted, ref} from 'vue'

  import client from "../service/axios"
  import SlideShowItem from "../components/SlideShowItem.vue"

  export default defineComponent({
    name: 'ProgramPage',
    components: {SlideShowItem},
    setup() {
      let shows = ref([])
      let autoplay = ref(true)
      let loading = ref(true)
      let currentShowIndex = ref(0)

      const loadShows = async () => {
        loading.value = true
        try {
          const data = await client.get('/shows')
          shows.value = data.shows
        } finally {
          loading.value = false
        }
      }

      const nextShow = () => {
        autoplay.value = false
        currentShowIndex.value = currentShowIndex.value === (shows.value.length-1) ? 0 : currentShowIndex.value+1
        setTimeout(() => autoplay.value = true, 2000)
      }

      onMounted(async () => {
        await loadShows()
        setInterval(nextShow, 10000)
      })

      return { loading, currentShowIndex, shows, autoplay }
    },
  })
</script>

<style lang="scss">
  body {
    background: black;
  }

  .slideshow, .slideshow-item, .slideshow-photo-wrap, .slideshow-photo {
    width: 100%;
    height: 100%;
  }
  .icon {
    background: black;
    padding: 20px;
    position: absolute;
    top: 5vh;
    left: 0;
    z-index: 5000;
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-border-top-right-radius: 10px;
    -webkit-border-bottom-right-radius: 10px;
    -moz-border-radius-topright: 10px;
    -moz-border-radius-bottomright: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    h2 {
      writing-mode: vertical-lr;
      color: white;
      display: inline-block;
      margin-top : 20px;
      font-size: 30px;
      font-weight: 400;
      line-height: 1.1eM;
      font-family: Manrope;
      b {
        color: #f58227;
      }
    }
  }
</style>
