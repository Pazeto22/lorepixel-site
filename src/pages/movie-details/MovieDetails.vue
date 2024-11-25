<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFetchMovies } from '@/composables'
import { PageContainer } from '@/components/layout'
import { MovieDetailsBanner } from '@/components'

const route = useRoute()
const { fetchMovieDetails, fetchMovieCredits, movieDetails, movieCredits } = useFetchMovies()
const movieId = route.params.id as string

/**
 * Valida se o filme foi encontrado.
 */
const hasMovie = computed(() => !movieId || !movieDetails.value)

onMounted(async () => {
  if (!movieId) {
    return
  }
  await fetchMovieDetails(movieId)
  await fetchMovieCredits(movieId)
})
</script>

<template>
  <div class="movie-details">
    <div v-if="hasMovie" class="movie-details__error">Filme não encontrado.</div>
    <div v-else-if="movieDetails" class="movie-details__content">
      <MovieDetailsBanner :movie-details="movieDetails" />

      <PageContainer>
        <h1>Movie Details</h1>
        <p>Movie ID: {{ movieId }}</p>
        {{ movieDetails }}
        <br /><br />
        {{ movieCredits }}
      </PageContainer>
    </div>
  </div>
</template>

<style lang="scss">
@import './MovieDetails.scss';
</style>
