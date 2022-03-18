<template>
  <div id="programItem" class="w-full" :class="'state-' + state">
<!--    <div v-if="state === 'active'" class="active-item-pulse z-10" style="width: 50%; height: 100%; position: absolute; top: 0px; left: 0px;">-->

<!--    </div>-->
    <h3 class="float-right inline-block text-3xl font-extrabold show-time z-20 relative">
      {{show.time.split(':')[0]}}<span class="text-base align-top pl-0.5">{{show.time.split(':')[1]}}</span>
    </h3>
    <h3 class="font-semibold mb-1 group-name text-kjBlue z-20 relative">
      {{show.groupName}}
    </h3>
    <h2 class="font-extrabold show-name z-20 relative">{{show.showName}}</h2>
  </div>
</template>

<script>
import {defineComponent, computed, ref, unref, onMounted, toRefs} from 'vue'
import { DateTime, Interval, Settings } from "luxon";

export default defineComponent({
  name: 'FestivalProgramItem',
  props: {
    show: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    Settings.defaultZoneName = "Europe/Prague"
    const {show} = toRefs(props)

    const state = ref('not-started') // 'active', 'past', 'not-started'

    const checkState = () => {
      let start = DateTime.now().set({hour: parseInt(show.value.time.split(':')[0]), minute: parseInt(show.value.time.split(':')[1]), seconds: 0})
      let end = start.plus({minutes: show.value.length})
      let fullLengthInterval = Interval.fromDateTimes(start, end)

      if (fullLengthInterval.isAfter(DateTime.now())) {
        state.value = 'not-started'
      } if (fullLengthInterval.isBefore(DateTime.now())) {
        state.value = 'past'
      } if (fullLengthInterval.contains(DateTime.now())) {
        state.value = 'active'
      }
    };

    onMounted(() => {
      setInterval(checkState, 1000)
    })

    return {
      show,
      state
    }
  },
})
</script>

<style lang="scss">
  #programItem {
    padding: max(10px, 5%) 5%;
    position: relative;
  }
  @keyframes program-pulse {
    0%   { background: #F2D3BC; }
    50% { background: #F4BE95; }
    100%   { background: #F2D3BC; }
  }
  .active-item-pulse {
    animation: program-pulse 3s infinite linear;
  }

  .show-name {
    @apply text-kjOrange;
    @apply text-4xl;
    font-variant: small-caps;
    text-shadow: 2.5px 2.5px 1px black;
  }

  .show-time {
    @apply text-kjBlue;
  }

  .group-name {
    @apply text-2xl;
  }

  .state-past {
    font-size: 0.3eM;
    @apply bg-gray-100;
    .show-name {
      @apply text-gray-400;
      @apply text-2xl;
    }
    .show-time {
      @apply text-gray-400;
    }
    .group-name {
      @apply text-gray-400;
      @apply text-lg;
    }
  }

  .state-active {
    @apply active-item-pulse;
  }
</style>
