<template>
  <div id="header" class="grow h-full">
    <div class="flex justify-center items-center h-full flex-col">
      <img src="/logo.png" class="mb-3">
      <h1 class="text-4xl text-black font-bold text-center">
        DIVADELNÍ KOJETÍN<br>
        <small class="mt-8 text-kjBlue uppercase">{{ subtitle }}</small>
      </h1>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'FestivalHeader',
  props: {
    subtitle: {
      type: String,
      required: false
    }
  },
});
</script>
