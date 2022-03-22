<template>
  <div class="flex flex-col bg-white basis-5/12">
    <FestivalHeader :subtitle="view === 'program' ? dayName : 'Ročník 2019'"/>
    <Transition>
      <FestivalProgram :shows="shows" :loading="loading" v-if="view === 'program'"/>
    </Transition>
  </div>
  <div class="basis-7/12 relative">
    <div v-if="photos.length <= 0">
      <FestivalHeader/>
    </div>
    <div v-else-if="photos.length > 0">
      <MainSlider :photos="photos" v-if="view === 'program'" @end-of-slides="endOfSlides" />
      <MainSlider :photos="photosTomorrow" v-if="view === 'programTomorrow'" @end-of-slides="endOfSlides" />
      <MainSlider :photos="lastYearPhotos" v-if="view === 'lastYear'" :withProgramSlide="false" @end-of-slides="endOfSlides"/>
    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from 'vue'

import MainSlider from '../components/MainSlider.vue'
import FestivalHeader from '../components/FestivalHeader.vue'
import FestivalProgram from '../components/FestivalProgram.vue'
import client from "../service/axios";

export default defineComponent({
  name: 'ProgramPage',
  components: {
    FestivalProgram,
    MainSlider,
    FestivalHeader,
  },
  emits: ['endOfSlides'],
  methods: {
    endOfSlides() {
      this.switchViews()
    },
    switchViews() {
      switch (this.view) {
        case 'program':
          this.view = 'lastYear'
          break;
        case 'lastYear':
          this.view = 'program'
          break;
      }
    },
  },
  setup() {
    let loading = ref(false)
    let shows = ref([])
    let dayName = ref()
    let view = ref('program')
    let photosTomorrow = ref([])
    let showPhotos = ref([])
    let lastYearPhotos = ref([])
    let photos = ref([])

    let parseShowsToPhotos = (shows) => {
      let photos = []
      photos = shows.map(
          (show) => {
            let photosCollection = [];
            for(let photo of show.photos) {
              photosCollection.push({url: photo, showName: show.showName})
            }
            return photosCollection
          })
      photos = [].concat.apply([], photos)
      return photos
    }

    const loadShows = async () => {
      loading.value = true
      try {
        const data = await client.get('/shows')
        shows.value = data.shows
        dayName.value = data.dayName
        showPhotos.value = parseShowsToPhotos(data.shows)
        photosTomorrow.value = parseShowsToPhotos(data.showsTomorrow)
        photos.value = showPhotos.value
        lastYearPhotos.value = data.lastYearPhotos
      } finally {
        loading.value = false
      }
    }

    onMounted(async () => {
      await loadShows()
    })

    return {
      shows,
      dayName,
      loading,
      photos,
      view,
      lastYearPhotos,
      photosTomorrow,
    }
  },
})
</script>

<style>
  .v-enter-active,
  .v-leave-active {
    transition: height 2s ease-in-out;
  }

  .v-enter-from,
  .v-leave-to {
    height: 0%!important;
  }
</style>
