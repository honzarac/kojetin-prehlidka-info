<template>
  <div class="icon">
    <img src="/logo.png">
    <h2>DIVADELNÍ KOJETÍN<br><b>2023</b></h2>
  </div>
  <div class="slideshow">
    <SlideShowItem :show="shows[currentShowIndex]" :autoplay="autoplay" v-if="!loading && !showLastYearSlideshow"></SlideShowItem>
    <SlideShowItem :show="lastYear" :autoplay="autoplay" v-if="!loading && showLastYearSlideshow"></SlideShowItem>
  </div>
</template>

<script>
  import {defineComponent, onMounted, ref} from 'vue'

  import client from "../service/axios"
  import SlideShowItem from "../components/SlideShowItem.vue"
  import TimeSettings from "../TimeSettings";

  export default defineComponent({
    name: 'ProgramPage',
    components: {SlideShowItem},
    setup() {
      let shows = ref([])
      let lastYear = ref(null)
      let autoplay = ref(true)
      let loading = ref(true)
      let currentShowIndex = ref(0)
      let showLastYearSlideshow = ref(false)

      const loadShows = async () => {
        loading.value = true
        try {
          const data = await client.get('/shows')
          shows.value = data.shows
          lastYear.value = {
            showName: 'Divadelní Kojetín 2022',
            groupName: null,
            time: null,
            length: null,
            date: null,
            photos: data.lastYearPhotos
          }
          TimeSettings.printSettingTimes(shows.value)
        } finally {
          loading.value = false
        }
      }

      const nextShow = () => {
        if (showLastYearSlideshow.value) {
          return
        } else if (currentShowIndex.value === (shows.value.length-1)) {
          showLastYearSlideshow.value = true
          setTimeout(() => {
            currentShowIndex.value = 0
            showLastYearSlideshow.value = false
          }, TimeSettings.lastYearPhotosDuration)
        } else {
          autoplay.value = false
          currentShowIndex.value = currentShowIndex.value+1
          setTimeout(() => autoplay.value = true, 2000)
        }
      }

      onMounted(async () => {
        await loadShows()
        setInterval(nextShow, TimeSettings.showDuration)
      })

      return { loading, currentShowIndex, shows, autoplay, showLastYearSlideshow, lastYear }
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
    cursor: none;
  }
  .icon {
    background: black;
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5000;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding-top: 10vh;
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
