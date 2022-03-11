<template>
  <div id="header" class="bg-kjBlue grow h-full">
    <div class="flex justify-end items-center h-full">
      <h1 class="text-4xl text-kjOrange font-bold inline-block text-right pr-12">
        DIVADELNÍ<br>
        KOJETÍN <br>
        <small class="block mt-8 text-white uppercase">{{dayName}}</small>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FestivalHeader',
  props: ['dayName']
}
</script>

<style scoped>
  #header {
    background-image: url('/ilustrace.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
