<template>
  <section class="slideshow" id="js-header" style="width:100%">
    <div class="slideshow__slide js-slider-home-slide is-current" :data-slide="index+1" v-for="(photo, index) in photos">
      <div class="slideshow__slide-background-parallax background-absolute js-parallax" data-speed="-1" data-position="top" data-target="#js-header">
        <div class="slideshow__slide-background-load-wrap background-absolute">
          <div class="slideshow__slide-background-load background-absolute">
            <div class="slideshow__slide-background-wrap background-absolute">
              <div class="slideshow__slide-background background-absolute">
                <div class="slideshow__slide-image-wrap background-absolute">
                  <div class="slideshow__slide-image background-absolute" :style="{ 'background-image': 'url(\'' + photo + '\'' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="side-nav vh-for-mobile" data-view="cover">
        <ul>
          <li class="label" data-view="cover">Pohádka</li>
        </ul>
      </div>
      <div class="slideshow__slide-caption">
        <div class="slideshow__slide-caption-text">
          <div class="container js-parallax" data-speed="2" data-position="top" data-target="#js-header">
            <h1 class="slideshow__slide-caption-title">KOSÍ BRATŘI</h1>
            <h1 class="slideshow__slide-caption-title">9:00</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="c-header-home_footer">
      <div class="o-container">

      </div>
    </div>
  </section>
</template>

<script>
import {defineComponent} from 'vue'


export default defineComponent({
  name: 'ProgramPage',
  components: {},
  props: {
    photos: {
      default: [
        "http://localhost:3001/static/shows/kosibratri/12.jpg",
        "http://localhost:3001/static/shows/kosibratri/16.jpg",
        "http://localhost:3001/static/shows/kosibratri/18.jpg",
      ]
    }
  }
})

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var $window = $(window);
var $body = $('body');

var Slideshow = function () {
  function Slideshow() {
    var _this = this;

    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Slideshow);

    var defaultOptions = {
      $el: $('.slideshow'),
      showArrows: false,
      showPagination: true,
      duration: 10000,
      autoplay: false
    };

    var options = Object.assign({}, defaultOptions, userOptions);

    this.$el = options.$el;
    this.maxSlide = this.$el.find($('.js-slider-home-slide')).length;
    this.showPagination = options.showPagination;
    this.currentSlide = 1;
    this.isAnimating = false;
    this.animationDuration = 1200;
    this.autoplaySpeed = options.duration;
    this.interval;
    this.$controls = this.$el.find('.js-slider-home-button');
    this.autoplay = this.maxSlide > 1 ? options.autoplay : false;

    this.$el.on('click', '.js-slider-home-next', function (event) {
      return _this.nextSlide();
    });
    this.$el.on('click', '.js-slider-home-prev', function (event) {
      return _this.prevSlide();
    });
    this.$el.on('click', '.js-pagination-item', function (event) {
      if (!_this.isAnimating) {
        _this.preventClick();
        _this.goToSlide(event.target.dataset.slide);
      }
    });

    this.init();
  }

  _createClass(Slideshow, [{
    key: 'init',
    value: function init() {
      this.goToSlide(1);


      if (this.autoplay) {
        this.startAutoplay();
      }

      if (this.showPagination) {
        var paginationNumber = this.maxSlide;
        var pagination = '<div class="pagination"><div class="container">';

        for (var i = 0; i < this.maxSlide; i++) {
          var item = '<span class="pagination__item js-pagination-item ' + (i === 0 ? 'is-current' : '') + '" data-slide=' + (i + 1) + '>' + (i + 1) + '</span>';
          pagination = pagination + item;
        }

        pagination = pagination + '</div></div>';

        this.$el.append(pagination);
      }
    }
  }, {
    key: 'preventClick',
    value: function preventClick() {
      var _this2 = this;

      this.isAnimating = true;
      this.$controls.prop('disabled', true);
      clearInterval(this.interval);

      setTimeout(function () {
        _this2.isAnimating = false;
        _this2.$controls.prop('disabled', false);
        if (_this2.autoplay) {
          _this2.startAutoplay();
        }
      }, this.animationDuration);
    }
  }, {
    key: 'goToSlide',
    value: function goToSlide(index) {
      this.currentSlide = parseInt(index);

      if (this.currentSlide > this.maxSlide) {
        this.currentSlide = 1;
      }

      if (this.currentSlide === 0) {
        this.currentSlide = this.maxSlide;
      }

      var newCurrent = this.$el.find('.js-slider-home-slide[data-slide="' + this.currentSlide + '"]');
      var newPrev = this.currentSlide === 1 ? this.$el.find('.js-slider-home-slide').last() : newCurrent.prev('.js-slider-home-slide');
      var newNext = this.currentSlide === this.maxSlide ? this.$el.find('.js-slider-home-slide').first() : newCurrent.next('.js-slider-home-slide');

      this.$el.find('.js-slider-home-slide').removeClass('is-prev is-next is-current');
      this.$el.find('.js-pagination-item').removeClass('is-current');

      if (this.maxSlide > 1) {
        newPrev.addClass('is-prev');
        newNext.addClass('is-next');
      }

      newCurrent.addClass('is-current');
      this.$el.find('.js-pagination-item[data-slide="' + this.currentSlide + '"]').addClass('is-current');
    }
  }, {
    key: 'nextSlide',
    value: function nextSlide() {
      this.preventClick();
      this.goToSlide(this.currentSlide + 1);
    }
  }, {
    key: 'prevSlide',
    value: function prevSlide() {
      this.preventClick();
      this.goToSlide(this.currentSlide - 1);
    }
  }, {
    key: 'startAutoplay',
    value: function startAutoplay() {
      var _this3 = this;

      this.interval = setInterval(function () {
        if (!_this3.isAnimating) {
          _this3.nextSlide();
        }
      }, this.autoplaySpeed);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.$el.off();
    }
  }]);

  return Slideshow;
}();

(function () {
  var loaded = false;
  var maxLoad = 3000;

  function load() {
    var options = {
      showPagination: true
    };

    var slideShow = new Slideshow(options);
  }

  function addLoadClass() {
    $body.addClass('is-loaded');

    setTimeout(function () {
      $body.addClass('is-animated');
    }, 600);
  }

  $window.on('load', function () {
    if (!loaded) {
      loaded = true;
      load();
    }
  });

  setTimeout(function () {
    if (!loaded) {
      loaded = true;
      load();
    }
  }, maxLoad);

  addLoadClass();
})();
</script>

<style lang="scss">
.pagination {
  position: absolute !important;
  width: 100%;
  text-align: center;
  right: 0;
  padding: 0 !important;
  bottom: 30px;
  z-index: 999;
}

.pagination__item {
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  font-size: 0;
  width: 10px;
  height: 10px;
  border: 1px solid #fff;
  margin: 0 5px;

  transition: .2s ease-in-out;

  &.is-current,
  &:hover {
    background-color: #fff;
  }
}

.container {
  position: relative;
  margin: 0 auto;
}

@media (max-width: 699px) {
  .container {
    padding-right: 40px;
    padding-left: 40px;
  }
}

@media (min-width: 700px) and (max-width: 1599px) {
  .container {
    padding-right: 7.5rem;
    padding-left: 7.5rem;
    max-width: 140rem;
  }
}

@media (min-width: 1600px) {
  .container {
    padding-right: 2.5625rem;
    padding-left: 2.5625rem;
    max-width: 144.125rem;
  }
}

.background-absolute {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-position: center;
  background-size: cover;
}

.slideshow {
  position: relative;
  color: #fff;
  overflow: hidden;
  min-height: 600px;
  height: 100vh;

  h3,
  h1,
  h2 {
    /*font-family: 'Montserrat', sans-serif;*/
    font-family: 'Lato', sans-serif;
    text-transform: uppercase;
    line-height: 2em;
  }

  h1 {
    font-size: 44px;
    font-weight: 800;
  }
}

.slideshow__slide {
  visibility: hidden;

  transition: visibility 0s 1.7s;

  &.is-current {
    visibility: visible;

    transition-delay: 0s;
  }
}

@media (max-width: 699px) {
  .slideshow .slideshow__slide {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}

@media (min-width: 700px) {
  .slideshow .slideshow__slide {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}

.slideshow__slide-background-load-wrap {
  transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 100%, 0);
  overflow: hidden;
}

.is-animated .slideshow__slide-background-load-wrap {

  transform: translate3d(0, 0, 0);

  transition-delay: 0s;
}

.slideshow__slide {
  &.is-prev .slideshow__slide-background-parallax,
  &.is-next .slideshow__slide-background-parallax,
  &.is-prev-section .slideshow__slide-background-parallax,
  &.is-next-section .slideshow__slide-background-parallax {

    transform: none !important;
  }
}

.slideshow__slide-background-load {
  transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);

  transform: translate3d(0, -50%, 0);
}

.is-animated .slideshow__slide-background-load {

  transform: translate3d(0, 0, 0);
}

.slideshow__slide-background-wrap {
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s;
  transform: translate3d(0, 0, 0);
}

.slideshow__slide {
  &.is-prev .slideshow__slide-background-wrap {

    transform: translate3d(0, -100%, 0);
  }

  &.is-next .slideshow__slide-background-wrap {

    transform: translate3d(0, 100%, 0);
  }

  &.is-prev-section .slideshow__slide-background-wrap {

    transform: translate3d(0, -100%, 0);

    transition: none;
  }

  &.is-next-section .slideshow__slide-background-wrap {

    transform: translate3d(0, 100%, 0);

    transition: none;
  }
}

.slideshow__slide-background {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1.5s;

  transform: scale(1);
  overflow: hidden;
}

.slideshow__slide {
  &.is-prev .slideshow__slide-background,
  &.is-next .slideshow__slide-background {

    transform: scale(0.5);

    transition-delay: 0s;
  }

  &.is-prev-section .slideshow__slide-background,
  &.is-next-section .slideshow__slide-background {

    transform: scale(0.5);

    transition-delay: 0s;

    transition: none;
  }
}

.slideshow__slide-image-wrap {
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.6s;

  transform: translate3d(0, 0, 0);
}

.slideshow__slide.is-prev .slideshow__slide-image-wrap {

  transform: translate3d(0, 50%, 0);
}

.slideshow__slide-image {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1.5s;
  transform: scale(1);
}

.slideshow__slide {
  &.is-prev .slideshow__slide-image,
  &.is-next .slideshow__slide-image {

    transform: scale(1.25);

    transition-delay: 0s;
  }

  &.is-prev-section .slideshow__slide-image,
  &.is-next-section .slideshow__slide-image {

    transform: scale(1.25);

    transition-delay: 0s;

    transition: none;
  }
}

.slideshow__slide-image {
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.35;
  }

  &::before {
    //background-color: rgba(255, 255, 255, 0.20);
  }

  &::after {
    //background: linear-gradient(to top, transparent 0%, #fff 20%);
  }
}

.slideshow__slide {
  &.is-prev .slideshow_container,
  &.is-next .slideshow_container,
  &.is-prev-section .slideshow_container,
  &.is-next-section .slideshow_container {

    transform: none !important;
  }
}

.slideshow__slide-caption-text {
  position: relative;
  height: 100%;
  padding-top: 10%;
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;

  transform: translate3d(0, 0, 0);
}

.slideshow__slide {
  &.is-prev .slideshow__slide-caption-text {
    transform: translate3d(-100%, -50%, 0);
  }

  &.is-next .slideshow__slide-caption-text {
    transform: translate3d(-100%, 10%, 0);
  }

  &.is-prev-section .slideshow__slide-caption-text {
    transform: translate3d(-100%, -50%, 0);
    transition: none;
  }

  &.is-next-section .slideshow__slide-caption-text {
    transform: translate3d(-100%, 10%, 0);
    transition: none;
  }
}

.slideshow__slide-caption {
  position: relative;
  height: 100%;

  transform: translate3d(-100%, 10%, 0);
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}

.is-animated .slideshow__slide-caption {

  transform: translate3d(0, 0, 0);
}

.slideshow__slide-caption-title {
  line-height: 1;

  &.-full {
    width: 100%;
  }
}

@media (max-height: 500px) {
  .slideshow__slide-caption-title {
    margin-bottom: 0 !important;
  }
}

@media (max-width: 699px) {
  .slideshow__slide-caption-title {
    font-size: 40px;
    margin-bottom: 150px;
  }
  .slideshow.-full .slideshow__slide-caption-title {
    margin-bottom: 30px;
  }
}

@media (min-width: 700px) {
  .slideshow__slide-caption-title {
    font-size: 5.625rem;
    margin-bottom: 1.25rem;
  }
}

@media (min-width: 700px) and (max-width: 749px) {
  .slideshow__slide-caption-title {
    font-size: 4.375rem;
  }
}

@media (min-width: 1600px) {
  .slideshow__slide-caption-title {
    font-size: 6.25rem;
  }
}

.slideshow__slide-caption-subtitle {
  display: inline-block;
  padding: 1.875rem 0;

  &.-load {
    transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;

    transform: translate3d(0, 3.75rem, 0);
  }
}

.is-animated .slideshow__slide-caption-subtitle.-load {

  transform: translate3d(0, 0, 0);
}

body {
  &[data-route-option="prev-section"] .slideshow__slide-caption-subtitle.-load,
  &[data-route-option="next-section"] .slideshow__slide-caption-subtitle.-load {

    transform: translate3d(0, 0, 0);
  }
}

.slideshow__slide-caption-subtitle-label {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  transform: translateZ(0);
  display: inline-block;
}

.o-hsub.-link:hover .slideshow__slide-caption-subtitle-label,
.o-hsub-wrap:hover .slideshow__slide-caption-subtitle-label {

  transform: translateX(20px);
}

/* OLD */

@media (min-width: 1200px) {
  body {
    height: 100%;
  }
}

img,
svg {
  max-width: 100%;
}

p {
  margin: 0;
}

.js-parallax {

  transform: translateZ(0);
  will-change: transform;
}

.scroll-content {
  overflow: hidden;
}

.slideshow__slide-image.background-absolute {
  width: 60%;
  left: 40%;
}

h1.slideshow__slide-caption-title {
  padding-left: 98px;
  padding-right: 98px;
  color: black;
}

.is-animated .slider-more-button {
  transform: rotateZ(0deg) translate3d(0, 0, 0);
}

p.slideshow__slide-caption-content {
  padding-left: 98px;
  padding-right: 98px;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  display: block;
  font-family: Plain, sans-serif;
  font-size: 14px;
  font-weight: 200;
  max-height: 218px;
  letter-spacing: 0.28px;
  line-height: 28px;
  margin-top: 20px;
  opacity: 0;
  text-size-adjust: 100%;
  transition: opacity 700ms cubic-bezier(0.8, 0, 0.55, 0.94), transform 700ms cubic-bezier(0.8, 0, 0.55, 0.94);
  transform: translate3d(-100px, 0, 0);
  max-width: 40%;
  width: 40%;
}

.slideshow__slide.is-current p.slideshow__slide-caption-content {
  opacity: 1;
  transition: opacity 700ms cubic-bezier(0.8, 0, 0.55, 0.94) 1470ms, transform 700ms cubic-bezier(0.8, 0, 0.55, 0.94) 1470ms;
  transform: translate3d(0, 0, 0);
}

span.slideshow__slide-caption-subtitle-label {
  font-weight: 800;
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.side-nav {
  display: none;
}

@media (min-width: 1024px) {
  .side-nav {
    display: block;
    left: 0;
    z-index: 2;
    width: 100vh;
    height: 5vw;
    transform-origin: top;
    display: flex;
    align-items: center;
    justify-content: center;

    transform: translate3d(-100%, 10%, 0);
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
  }
  .is-animated {
    .side-nav {
      transition: opacity 700ms cubic-bezier(0.8, 0, 0.55, 0.94) 470ms, transform 700ms cubic-bezier(0.8, 0, 0.55, 0.94) 470ms;
      transform: rotateZ(-90deg) translate3d(-390px, -50vh, 0);
    }

    .slideshow__slide-caption {

    }
  }
  .side-nav {
    opacity: 1;
    transition: opacity 700ms cubic-bezier(0.8, 0, 0.55, 0.94) 1470ms, transform 700ms cubic-bezier(0.8, 0, 0.55, 0.94) 1470ms;

    ul {
      list-style: none;
      margin: 0 0;
      padding-top: 0.3vw;
    }

    li {
      display: inline-block;
      line-height: 0.9em;
      margin: 0 15px;
      padding-bottom: 8px;
      border-bottom: 1px solid transparent;
      cursor: pointer;
      transition: opacity 400ms cubic-bezier(0.8, 0, 0.55, 0.94), border-color 400ms cubic-bezier(0.8, 0, 0.55, 0.94);
    }

    .label {
      font-size: 20px;
      text-transform: uppercase;
      opacity: 0.3;
      margin: 0 0;
      color: #0a0c0d;
      font-weight: 800;
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    &[data-view="cover"] li[data-view="cover"] {
      opacity: 1;
      border-bottom: 1px solid #000;
    }
  }
  .slideshow__slide {
    &.is-prev .side-nav {

      transform: translate3d(-100%, -50%, 0);
    }

    &.is-next .side-nav {

      transform: translate3d(-100%, 10%, 0);
    }

    &.is-prev-section .side-nav {

      transform: translate3d(-100%, -50%, 0);

      transition: none;
    }

    &.is-next-section .side-nav {

      transform: translate3d(-100%, 10%, 0);

      transition: none;
    }
  }
}

/*end slider show*/


</style>
