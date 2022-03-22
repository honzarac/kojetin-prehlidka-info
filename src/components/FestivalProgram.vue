<template>
  <div id="program" class="flex w-full flex-col grow-0">
    <div v-if="loading" class="text-center">
      Načítám...
    </div>

    <div v-else-if="!loading && shows.length <= 0" class="text-center">
      Nepodařilo se načíst data
    </div>

    <div v-else v-for="(show) in shows">
      <FestivalProgramItem :show="show" small="true"/>
      <hr>
    </div>
  </div>
</template>

<script>
import FestivalProgramItem from './FestivalProgramItem.vue';
import {defineComponent} from "vue";

export default defineComponent({
  name: 'FestivalProgram',
  components: {FestivalProgramItem},
  props: {
    shows: {
      type: Array,
      default: []
    },
    loading: {
      type: Boolean,
      default: false
    },
  }
});
</script>

<style scoped>
#program {
  height: 75%;
}
</style>

