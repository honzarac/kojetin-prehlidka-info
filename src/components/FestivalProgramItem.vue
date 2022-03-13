<template>
  <div id="programItem" class="w-full" :class="'state-' + state">
<!--    <h3 class="float-right inline-block text-3xl font-extrabold" :class="past ? 'text-gray-700' : 'text-kjBlue'">-->
<!--      {{show.time.split(':')[0]}}<span class="text-base align-top pl-0.5">{{show.time.split(':')[1]}}</span>-->
<!--    </h3>-->
    <h3 class="text-2xl font-semibold mb-1 group-name">
      {{show.groupName}}
    </h3>
    <h2 class="font-extrabold text-4xl" style="font-variant: small-caps">{{show.showName}}</h2>
<!--    <div class="w-full rounded-full h-1 mt-4" v-if="active">-->
<!--      <div class="bg-kjBlue h-1 rounded-full" :style="'width: ' + progress + '%'"></div>-->
<!--    </div>-->
  </div>
</template>

<script>
import {defineComponent, computed, ref, unref, onMounted, toRefs} from 'vue'
import {format, isWithinInterval, differenceInSeconds} from 'date-fns'

export default defineComponent({
  name: 'FestivalProgramItem',
  props: {
    show: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const {show} = toRefs(props)

    const state = ref('not_started') // 'active', 'past', 'not_started'
    // const progress = ref()

    // const active = computed(() => {
    //   console.log(show, this.show)
    //   return isWithinInterval(new Date(), {
    //     start: new Date().setHours(parseInt(show.time.split(':')[0]), parseInt(show.time.split(':')[1])),
    //     end: new Date().setHours(parseInt(show.time.split(':')[0]), parseInt(show.time.split(':')[1]) + show.length)
    //   })
    // })

    // const past = computed(()=> show.time === '8:15')

    // const now = ref(new Date())

    // onMounted(() => {
    //   setInterval(() => {
    //     // TODO progress.value,
    //   })
    // })

    return {
      show,
      state
    }
  },
  // mounted: function() {
  //   var app = this;
  //   setInterval(function(){
  //     app.now = new Date();
  //
  //     let start = new Date().setHours(parseInt(app.show.time.split(':')[0]), parseInt(app.show.time.split(':')[1]))
  //     let end = new Date().setHours(parseInt(app.show.time.split(':')[0]), parseInt(app.show.time.split(':')[1]) + app.show.length)
  //
  //     console.log(new Date(start), new Date())
  //     console.log(differenceInSeconds(start, new Date()), differenceInSeconds(end, start))
  //     app.progress = (differenceInSeconds(start, new Date()) / differenceInSeconds(end, start)) * 100
  //   }, 1000);
  // }
})
</script>

<style>
  .show-shadow {
    text-shadow: 2.5px 2.5px 1px #000;
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
