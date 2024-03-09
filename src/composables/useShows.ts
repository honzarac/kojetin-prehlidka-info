import Settings from "../Settings";
import {Ref, ref} from "vue";
import {Show} from "../types/Show";
import {loadShowsRequest} from "../service/axios";

export function useShows() {
  const loading = ref(true)
  const shows: Ref<Show[]> = ref([])
  const lastYear: Ref<null|Show> = ref(null)

  const loadShows = async () => {
    loading.value = true
    try {
      const data = await loadShowsRequest()
      shows.value = data.shows as Show[]
      shows.value.push({
        showName: 'Divadelní Kojetín 2023',
        groupName: null,
        time: null,
        length: null,
        date: null,
        photos: data.lastYearPhotos,
        slideDuration: Settings.lastYearPhotosDuration,
      })
      Settings.printSettingTimes(shows.value)
    } finally {
      loading.value = false
    }
  }

  return {loadShows, loading, lastYear, shows}
}