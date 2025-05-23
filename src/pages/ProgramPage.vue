<template>
  <div class="play-state" v-if="playState">{{playState}}</div>
  <div class="icon">
    <img src="/logo.png" @click="emit('openSettings')">
    <h2>DIVADELNÍ KOJETÍN<br><b>{{ year }}</b></h2>
  </div>
  <div class="slideshow" @keyup.right="nextShow()" v-if="!loading">
    <SlideShowItem
      :show="shows[currentShowIndex]"
      :autoplay="autoplay"
      :photoDuration="photoDuration"
    ></SlideShowItem>
  </div>
</template>

<script setup>
import {computed, onBeforeMount, onBeforeUnmount, onMounted, ref, toRefs} from 'vue'

import SlideShowItem from "../components/SlideShowItem.vue"
import Settings from "../Settings";
import {useShows} from "../composables/useShows";
const emit = defineEmits(['openSettings'])

const props = defineProps({
  showDuration: {
    required: true,
    type: Number
  },
  photoDuration: {
    required: true,
    type: Number
  },
  lastYearPhotoDuration: {
    required: true,
    type: Number
  }
})

let autoplay = ref(true)
let currentShowIndex = ref(0)
let year = Settings.year
let playState = ref(null)

const currentTimeout = ref();

const showsComposable = useShows();
const {loading, showsResult} = toRefs(showsComposable)
const shows = computed(() => {
  if (!showsComposable.shows.value) {
    return []
  }
  return [
    ...showsComposable.shows.value,
    {
      showName: 'Divadelní Kojetín 2024',
      groupName: null,
      time: null,
      length: null,
      date: null,
      photos: showsComposable.lastYearPhotos.value,
      slideDuration: props.lastYearPhotoDuration,
    },
    {
      showName: 'Sponzoři',
      groupName: null,
      time: null,
      length: null,
      date: null,
      photos: [
        "http://localhost:8080/static/sponzors/image.png",
        "http://localhost:8080/static/sponzors/image2.png",
        "http://localhost:8080/static/sponzors/image3.png",
      ],
      slideDuration: 15_000,
    }
  ]
})

const nextShow = (goTo) => {
  autoplay.value = false
  currentShowIndex.value = currentShowIndex.value === (shows.value.length-1) ? 0 : (goTo ?? currentShowIndex.value+1)
  setTimeout(() => autoplay.value = true, 2000)
  currentTimeout.value = setTimeout(nextShow, shows.value[currentShowIndex.value]?.slideDuration ?? props.showDuration)
}

onMounted(async () => {
  await showsComposable.loadShows()
  nextShow(0)
})

const showControl = (e) => {
  if (e.keyCode === 39) {
    clearTimeout(currentTimeout.value)
    nextShow()
  }
  if (e.keyCode === 32) {
    if (currentTimeout.value) {
      pause()
    }
    else {
      play()
    }
  }
}
onBeforeMount(() => {
  window.addEventListener('keydown', showControl, null)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', showControl)
})
const pause = () => {
  if (currentTimeout.value) {
    clearTimeout(currentTimeout.value)
  }
  playState.value = 'PAUZA'
  currentTimeout.value = null
}
const play = () => {
  playState.value = null
  nextShow()
}
</script>

<style lang="scss">
  body {
    background: black;
  }

  .play-state {
    position: fixed;
    top: 10%;
    right:10%;
    color: white;
    font-size: 2eM;
    z-index: 10000;
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
