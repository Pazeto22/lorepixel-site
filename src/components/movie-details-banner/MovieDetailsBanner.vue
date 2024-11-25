<script setup lang="ts">
import { useFetchMovies } from '@/composables'
import { PageContainer } from '@/components/layout'

import { tmdbMediaUrl } from '@/config/constants'
import { computed } from 'vue'

import type { MovieDetailsType } from '@/types'

const props = defineProps({
  movieDetails: {
    type: Object as () => MovieDetailsType,
    required: true
  }
})

/**
 * Título do filme.
 */
const title = computed(() => {
  return props.movieDetails.title
})

/**
 * Data de lançamento do filme.
 */
const releasteDate = computed(() => {
  return props.movieDetails.release_date.split('-')[0]
})

/**
 * URL da imagem de fundo do banner.
 */
const movieBackgroundImage = computed(() => {
  if (!props.movieDetails || !props.movieDetails.backdrop_path) {
    return ''
  }

  return `url(${tmdbMediaUrl}/${props.movieDetails.backdrop_path})`
})

/**
 * URL da imagem do poster do filme.
 */
const moviePosterImage = computed(() => {
  if (!props.movieDetails || !props.movieDetails.poster_path) {
    return ''
  }

  return `url(${tmdbMediaUrl}/${props.movieDetails.poster_path})`
})
</script>

<template>
  <div class="movie-details-banner" :style="{ backgroundImage: movieBackgroundImage }">
    <div class="movie-details-banner__wrapper">
      <PageContainer>
        <div class="movie-details-banner__content">
          <div
            class="movie-details-banner__poster"
            :style="{ backgroundImage: moviePosterImage }"
          />
          <div class="movie-details-banner__info">
            <h2 class="movie-details-banner__title">
              <span> {{ title }}</span>
              <span> ({{ releasteDate }}) </span>
            </h2>
          </div>
        </div>
      </PageContainer>
    </div>
  </div>
</template>

<style lang="scss">
@import './MovieDetailsBanner.scss';
</style>
