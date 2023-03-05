<template>
  <div class="slideshow-item">
  <div class="slideshow-item-overlay"></div>
  <transition :name="show.showName">
    <div :class="['slideshow-item-info', {'animate': changingShow}]">
      <span class="daytime"><b>{{ dayName }}</b> / <div class="time">{{show.time}}</div></span>
      <div class="group-name">{{show.groupName}}</div>
      <h1 :class="[{'smaller': show.showName.length > 30}]">{{show.showName}}</h1>
    </div>
  </transition>
  <div :class="['slideshow-photo-wrap', {'active': currentPhoto === photoIndex}, {'leaving': leavingPhoto === photoIndex}]" v-for="(photo, photoIndex) in show.photos">
    <div class="slideshow-photo" :style="{ 'background-image': 'url(\'' + photo + '\'' }">
    </div>
  </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref, watch} from 'vue'
  import { DateTime } from "luxon";

  export default defineComponent({
    name: 'SlideshowItem',
    props: {
      show: {
        type: Object
      },
      autoplay: {
        type: Boolean
      }
    },

    setup(props) {
      const currentPhoto = ref(0)
      const leavingPhoto = ref(null)
      const dayName = ref(DateTime.fromISO(props.show.date).setLocale('cs').toFormat('cccc'))
      const changingShow = ref(true)


      let nextSlide = () => {
        leavingPhoto.value = currentPhoto.value
        let randNextPhoto = currentPhoto.value;
        do {
          randNextPhoto = Math.floor(Math.random() * props.show.photos.length)
        } while (randNextPhoto === currentPhoto.value)
        currentPhoto.value = randNextPhoto;
      }

      onMounted(async () => {
        setInterval(() => { if (props.autoplay) { nextSlide() }}, 5000)
      })

      watch(() => props.show, (newShow, oldShow) => {
        if (newShow.showName !== oldShow.showName) {
          console.log('watch triggered')
          changingShow.value = false
          currentPhoto.value = null
          leavingPhoto.value = null
          nextSlide()
          dayName.value = DateTime.fromISO(props.show.date).setLocale('cs').toFormat('cccc')
          setTimeout(() => changingShow.value = true, 100)
        }
      });

      return { currentPhoto, leavingPhoto, dayName, changingShow }
    },
  });
</script>

<style lang="scss">
  .slideshow-item {
    position: relative;
  }

  .slideshow-item-overlay {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 70%;
    z-index: 110;
    background: linear-gradient(
            to bottom,
            hsla(0, 0%, 0%, 0) 0%,
            hsla(0, 0%, 0%, 0.06) 11%,
            hsla(0, 0%, 0%, 0.13) 20.6%,
            hsla(0, 0%, 0%, 0.208) 28.9%,
            hsla(0, 0%, 0%, 0.292) 36.2%,
            hsla(0, 0%, 0%, 0.379) 42.6%,
            hsla(0, 0%, 0%, 0.469) 48.3%,
            hsla(0, 0%, 0%, 0.558) 53.5%,
            hsla(0, 0%, 0%, 0.644) 58.4%,
            hsla(0, 0%, 0%, 0.726) 63.2%,
            hsla(0, 0%, 0%, 0.801) 68.1%,
            hsla(0, 0%, 0%, 0.867) 73.2%,
            hsla(0, 0%, 0%, 0.922) 78.8%,
            hsla(0, 0%, 0%, 0.964) 84.9%,
            hsla(0, 0%, 0%, 0.991) 92%,
            hsl(0, 0%, 0%) 100%
    );
  }

  .slideshow-item-info {
    position: absolute;
    display: none;
    z-index: 120;
    left: 20vw;
    bottom: 10%;
    color: white;
    .daytime {
      font-size: 40px;
      text-transform: uppercase;
      display: block;
      margin-left: 15px;
      font-family: Montserrat;
      .time {
        font-size: 0.8em;
        display: inline-block;
        vertical-align: top;
      }
    }
    h1 {
      z-index: 5;
      line-height: 180px;
      letter-spacing: -6px;
      font-weight: 800;
      font-size: 160px;
      width: 60vw;
      &.smaller {
        font-size: 100px;
        line-height: 120px;
      }
    }
    .group-name {
      font-family: Montserrat;
      margin-left: 14px;
      font-size: 30px;
      margin-bottom: 5px;
    }
  }

  .slideshow-item-info.animate {
    display: block;
    animation: 2s anim-lineUp ease-out 1;
  }

  .slideshow-photo-wrap {
    position: absolute;
    display: none;
    top: 0px;
    left: 0px;
    z-index: 90;
  }

  .slideshow-photo {
    background-size: cover;
    background-position: center center;
  }

  .slideshow-item {
    .slideshow-photo-wrap.active {
      animation: 1s photo-ease-in ease-out 1;
      display: block;
      z-index: 95;
      .slideshow-photo {
        animation: 10s zoom-in ease-out 1;
      }
    }
  }

  .slideshow-item {
    .slideshow-photo-wrap.leaving {
      animation: 1s photo-ease-out ease-out 1;
      display: block;
    }
  }

  @keyframes anim-lineUp {
    0% {
      opacity: 0;
      clip-path: inset(-100px -500px 0px 40%);
      transform: translateX(-30%);
    }
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
      transform: translateX(0%);
      clip-path: inset(-100px -500px 0px 0%);
    }
    100% {
      opacity: 1;
      transform: translateX(0%);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }

  @keyframes photo-ease-in {
    0% {
      transform: translateX(100vw);
      opacity: 0.3;
    }
    60% {
      opacity: 1;
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes photo-ease-out {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100vw);
    }
  }
</style>