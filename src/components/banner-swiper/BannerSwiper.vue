<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, A11y, Autoplay } from 'swiper/modules'
import { useBannerSwiper, useFetchMovies } from '@/composables'
import { tmdbMediaUrl } from '@/config/constants'

const { updateViewportWidth, displayBlurredBackground } = useBannerSwiper()
const { fetchPopularMovies, popularMovies } = useFetchMovies()

/**
 * Módulos do Swiper
 */
const modules = [Pagination, A11y, Autoplay]

onMounted(async () => {
  updateViewportWidth()
  window.addEventListener('resize', updateViewportWidth)

  await fetchPopularMovies(5)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateViewportWidth)
})
</script>

<template>
  <div class="banner-swiper">
    <swiper
      v-if="popularMovies.length > 0"
      :modules="modules"
      :pagination="{ clickable: true }"
      :loop="true"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: false
      }"
    >
      <swiper-slide v-for="movie in popularMovies" :key="movie.id">
        <div class="banner-swiper__item">
          <div class="banner-swiper__content">
            <h2 class="banner-swiper__title">{{ movie.title }}</h2>
            <p class="banner-swiper__overview">{{ movie.overview }}</p>
          </div>
          <img class="banner-swiper__image" :src="`${tmdbMediaUrl}/${movie.backdrop_path}`" />
          <img
            v-if="displayBlurredBackground"
            class="banner-swiper__background-image"
            :src="`${tmdbMediaUrl}/${movie.backdrop_path}`"
          />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss">
@import 'swiper/css';
@import './BannerSwiper.scss';
@import 'swiper/css/navigation';
@import 'swiper/css/pagination';
@import 'swiper/css/scrollbar';
@import 'swiper/css/autoplay';
</style>
