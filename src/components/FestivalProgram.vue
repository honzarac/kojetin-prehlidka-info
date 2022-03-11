<template>
  <div id="program" class="flex w-full flex-col justify-center grow-0">
    <template v-for="(show, index) in shows">
      <FestivalProgramItem :show="show" small="true"/>
      <hr>
    </template>
  </div>
</template>

<script>
import FestivalProgramItem from './FestivalProgramItem.vue';

export default {
  name: 'FestivalProgram',
  components: {FestivalProgramItem},
  props: ['shows']
}
</script>

<style scoped>
#program {
  height: 75%;
}
</style>

