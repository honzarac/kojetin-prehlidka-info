<template>
  <div class="close-wrap">
    <div @click="emit('close')" class="close">⨯</div>
  </div>

  <div class="setting-item">
    <div class="setting-heading">Interval představení</div>
    <vue-slider
      :min="1"
      :max="100"
      v-model="showDuration"
      :data="{
            '5': '5s',
            '30': '30s',
            '40': '40s',
            '50': '50s',
            '60': '60s',
            '70': '70s',
            '80': '80s',
          }"
      :marks="true"
    >
    </vue-slider>
  </div>

  <div class="setting-item">
    <div class="setting-heading">Interval fotek</div>
    <vue-slider
      :min="1"
      :max="100"
      v-model="photoDuration"
      :data="{
            '1': '1s',
            '3': '3s',
            '5': '5s',
            '7': '7s',
            '10': '10s',
            '15': '15s',
            '20': '20s',
          }"
      :marks="true"
    >
    </vue-slider>
  </div>

  <div class="setting-item">
    <div class="setting-heading">Délka série fotek z minulého roku</div>
    <vue-slider
      :min="1"
      :max="900"
      v-model="lastYearPhotoDuration"
      :marks="val => val % 60 === 0 ? ({
          label: `${val/60}`,
        }) : false"
      :tooltip-formatter="val => Settings.secondsToHumanReadable(val)"
    >
    </vue-slider>
  </div>

  <br>
  <small>Celková délka smyčky</small><br>
  <b>{{Settings.secondsToHumanReadable(loopLength)}}</b> pro celou slideshow
</template>

<script setup>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import {computed, onMounted, ref, watch} from "vue";
import {useShows} from "../composables/useShows";
import Settings from "../Settings";

const emit = defineEmits(['close'])

const showsResult = useShows()
onMounted(() => showsResult.loadShows())

const showDurationModel = defineModel('showDuration')
const photoDurationModel = defineModel('photoDuration')
const lastYearPhotoDurationModel = defineModel('lastYearPhotoDuration')

const loopLength = computed(() => (parseInt(showDuration.value) * showsResult.shows.value.length) + parseInt(lastYearPhotoDuration.value))

const showDuration = ref((showDurationModel.value/1000).toString())
const photoDuration = ref((photoDurationModel.value/1000).toString())
const lastYearPhotoDuration = ref((lastYearPhotoDurationModel.value/1000).toString())

watch(showDuration, (newShowDuration) => {
  localStorage.setItem('showDuration', parseInt(newShowDuration))
  showDurationModel.value = parseInt(newShowDuration)*1000
})
watch(photoDuration, (newPhotoDuration) => {
  localStorage.setItem('photoDuration', parseInt(newPhotoDuration))
  photoDurationModel.value = parseInt(newPhotoDuration)*1000
})
watch(lastYearPhotoDuration, (newLastYarPhotoDuration) => {
  localStorage.setItem('lastYearPhotoDuration', parseInt(newLastYarPhotoDuration))
  lastYearPhotoDurationModel.value = parseInt(newLastYarPhotoDuration)*1000
})
</script>

<style lang="scss" scoped>
.close-wrap {
  text-align: right;
}
.close {
  color: white;
  font-size: 60px;
  text-align: right;
  cursor: pointer;
  display: inline-block;
  &:hover {
    color: #ddd;
  }
}
.setting-item {
  margin-bottom: 60px;
  .setting-heading {
    font-size: 15px;
    margin-bottom: 15px;
  }
}
</style>