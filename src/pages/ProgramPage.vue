<template>
  <div class="icon">
    <img src="/logo.png">
    <h2>DIVADELNÍ KOJETÍN<br><b>{{ year }}</b></h2>
  </div>
  <div class="slideshow" @keyup.right="nextShow()">
    <SlideShowItem :show="shows[currentShowIndex]" :autoplay="autoplay" v-if="!loading && !showLastYearSlideshow"></SlideShowItem>
    <SlideShowItem :show="lastYear" :autoplay="autoplay" v-if="!loading && showLastYearSlideshow"></SlideShowItem>
  </div>
</template>

<script setup>
import {defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref} from 'vue'

  import client from "../service/axios"
  import SlideShowItem from "../components/SlideShowItem.vue"
  import Settings from "../Settings";
  let shows = ref([])
  let lastYear = ref(null)
  let autoplay = ref(true)
  let loading = ref(true)
  let currentShowIndex = ref(0)
  let showLastYearSlideshow = ref(false)
  let year = Settings.year

  const loadShows = async () => {
    loading.value = true
    try {
      const data = await client.get('/shows')
      shows.value = data.shows
      lastYear.value = {
        showName: 'Divadelní Kojetín 2023',
        groupName: null,
        time: null,
        length: null,
        date: null,
        photos: data.lastYearPhotos
      }
      Settings.printSettingTimes(shows.value)
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
      }, Settings.lastYearPhotosDuration)
    } else {
      autoplay.value = false
      currentShowIndex.value = currentShowIndex.value+1
      setTimeout(() => autoplay.value = true, 2000)
    }
  }

  onMounted(async () => {
    await loadShows()
    setInterval(nextShow, Settings.showDuration)
  })

  const moveShows = (e) => { if (e.keyCode === 39) { nextShow()}}
  onBeforeMount(() => {
    window.addEventListener('keydown', moveShows, null)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', moveShows)
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
