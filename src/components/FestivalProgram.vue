<template>
  <h3 class="text-2xl text-kjOrange font-bold text-center">PÁTEK</h3>
  <ol class="relative border-l border-l-4 border-kjOrange">
    <template v-for="(show, index) in shows">
      <li :class="((index+1 === shows.length) ? 'pb-20' : 'mb-20') + ' ml-16'">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
        <time class="mb-1 text-xl font-normal leading-none text-white">{{ show.groupName }}</time>
        <h3 class="text-3xl font-bold text-kjOrange">{{ show.showName }}</h3>
      </li>
    </template>
  </ol>
  <ol class="relative border-l-4 border-white">
    <li class="mb-20 ml-16" v-for="show in shows">
      <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
      <time class="mb-1 text-xl font-normal leading-none text-white">{{ show.groupName }}</time>
      <h3 class="text-3xl font-bold text-kjOrange">{{ show.showName }}</h3>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'FestivalProgram',
  computed: {
    shows: () => {
      return [
        {
          showName: 'O PRINCEZNĚ, KTERÁ RÁČKOVALA',
          groupName: 'Divadlo Scéna Zlín',
        },
        {
          showName: 'MANŽELÉ V NESNÁZÍCH',
          groupName: 'Divadelní spolek Slavkov u Brna',
        },
        {
          showName: 'TRHNI SI, OTČE!',
          groupName: 'Divadlo Brod Uherský Brod',
        },
      ]
    }
  }
}
</script>
