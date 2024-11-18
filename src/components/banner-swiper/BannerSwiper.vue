<script setup lang="ts">
import api from '@/config/api'
import type { MovieType } from '@/types/movieType'
import { Pagination, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Módulos do Swiper
 */
const modules = [Pagination, A11y]

/**
 * Variável que controla a exibição do background desfocado
 */
const displayBlurredBackground = ref(window.innerWidth > 1280)

/**
 * URL base para as imagens do TMDB
 */
const tmdbMediaUrl = 'https://image.tmdb.org/t/p/original'

/**
 * Array com os 5 filmes mais populares
 */
const popularBanners = ref<MovieType[]>([])

/**
 * Atualiza a variável displayBlurredBackground de acordo com a largura da tela
 */
const updateViewportWidth = () => {
  displayBlurredBackground.value = window.innerWidth > 1280
}

/**
 * Busca na API os 5 filmes mais populares para exibir nos banners
 */
const getFiveBanners = async (): Promise<void> => {
  const params = new URLSearchParams({
    language: 'pt-BR',
    page: '1',
    sort_by: 'popularity.desc'
  })

  try {
    await api.get(`discover/movie`, { params }).then((response) => {
      popularBanners.value = response.data.results.slice(0, 5)
    })
  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  updateViewportWidth()
  window.addEventListener('resize', updateViewportWidth)

  await getFiveBanners()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateViewportWidth)
})
</script>

<template>
  <div class="banner-swiper">
    <swiper
      v-if="popularBanners.length > 0"
      :modules="modules"
      :pagination="{ clickable: true }"
      :loop="true"
    >
      <swiper-slide v-for="banner in popularBanners" :key="banner.id">
        <img class="swiper-image" :src="`${tmdbMediaUrl}/${banner.backdrop_path}`" />
        <img
          v-if="displayBlurredBackground"
          class="swiper-background-image"
          :src="`${tmdbMediaUrl}/${banner.backdrop_path}`"
        />
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
</style>
