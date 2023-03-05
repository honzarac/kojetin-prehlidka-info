<template>
  <div class="slideshow">
    <SlideShowItem :show="shows[currentShowIndex]" v-if="!loading"></SlideShowItem>
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
        currentShowIndex.value = currentShowIndex.value === (shows.value.length-1) ? 0 : currentShowIndex.value+1
      }

      onMounted(async () => {
        await loadShows()
        setInterval(nextShow, 5000)
      })

      return { loading, currentShowIndex, shows }
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
</style>
