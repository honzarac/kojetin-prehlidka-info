<template>
  <div id="programItem" class="w-full" :class="[past && 'bg-gray-300 opacity-50', active && 'active-item-pulse']">
    <h3 class="float-right inline-block text-2xl font-bold" :class="past ? 'text-gray-500' : 'text-kjBlue'">
      {{show.time}}
    </h3>
    <h3 class="text-2xl font-bold" :class="past ? 'text-gray-500' : 'text-kjBlue'">
      {{show.groupName}}
    </h3>
    <h2
        class="uppercase font-extrabold show-shadow text-4xl"
        :class="[
            past ? 'text-gray-400' : 'text-kjOrange',
        ]">
      {{show.showName}}
    </h2>
    <div class="w-full rounded-full h-1 mt-4" v-if="active">
      <div class="bg-kjBlue h-1 rounded-full" style="width: 100%"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FestivalProgramItem',
  props: ['show'],
  computed: {
    active: function () {
      return this.show.time === '10:00';
    },
    past: function () {
      return this.show.time === '8:15';
    }
  }
}
</script>

<style>
  .show-shadow {
    text-shadow: 2px 2px 0px #264296;
  }
  #programItem {
    padding: max(10px, 5%) 5%;
  }
  @keyframes program-pulse {
    0%   { background: #F2D3BC; }
    50% { background: #F4BE95; }
    100%   { background: #F2D3BC; }
  }
  .active-item-pulse {
    animation: program-pulse 3s infinite linear;
  }
</style>
