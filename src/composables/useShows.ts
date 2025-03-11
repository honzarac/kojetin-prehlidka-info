import Settings from "../Settings";
import {Ref, ref} from "vue";
import {Show} from "../types/Show";
import {loadShowsRequest} from "../service/axios";

export function useShows() {
  const loading = ref(true)
  const shows: Ref<Show[]> = ref([])
  const lastYear: Ref<null|Show> = ref(null)
  const lastYearPhotos: Ref<string[]> = ref([])

  const loadShows = async () => {
    loading.value = true
    try {
      const data = await loadShowsRequest()
      shows.value = data.shows as Show[]
      lastYearPhotos.value = data.lastYearPhotos as string[]
      Settings.printSettingTimes(shows.value)
    } finally {
      loading.value = false
    }
  }

  return {loadShows, loading, lastYear, lastYearPhotos, shows}
}