<script setup lang="ts">
import { Pagination, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const onSwiper = (swiper: any) => {
  console.log(swiper)
}

const onSlideChange = () => {
  console.log('slide change')
}

const modules = [Pagination, A11y]
</script>

<template>
  <div class="banner-swiper">
    <swiper
      :modules="modules"
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide><img src="/public/images/banners/banner-1.jpg" /></swiper-slide>
      <swiper-slide><img src="/public/images/banners/banner-2.jpg" /></swiper-slide>
      <swiper-slide><img src="/public/images/banners/banner-3.jpg" /></swiper-slide>
      <swiper-slide><img src="/public/images/banners/banner-4.jpg" /></swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss">
@import 'swiper/css';
@import './BannerSwiper.scss';
@import 'swiper/css/navigation';
@import 'swiper/css/pagination';
@import 'swiper/css/scrollbar';
</style>
