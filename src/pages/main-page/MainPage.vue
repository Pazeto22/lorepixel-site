<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '@/config/api'

import { PageContainer } from '@/components/layout'
import { BannerSwiper, MainSection, MovieCard } from '@/components'

import type { MovieType } from '@/types/movieType'

/**
 * Lista de próximos lançamentos
 */
const upcomingMovies = ref<MovieType[]>([])

/**
 * Lista de filmes em cartaz
 */
const nowPlayingMovies = ref<MovieType[]>([])

/**
 * Busca na API os 8 próximos lançamentos para exibir na seção de próximos lançamentos
 */
const fetchUpcomingMovies = async (): Promise<void> => {
  const params = new URLSearchParams({
    language: 'pt-BR',
    region: 'BR',
    page: '1'
  })

  try {
    await api.get(`movie/upcoming`, { params }).then((response) => {
      const upcomingResponse = response.data.results.splice(0, 8)
      upcomingMovies.value = upcomingResponse.sort((a: MovieType, b: MovieType) => {
        return new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      })
    })
  } catch (err) {
    console.error(err)
  }
}

/**
 * Busca na API os 5 filmes mais populares para exibir nos banners
 */
const fetchNowPlayingMovies = async (): Promise<void> => {
  const params = new URLSearchParams({
    language: 'pt-BR',
    region: 'BR',
    page: '1'
  })

  try {
    await api.get(`movie/now_playing`, { params }).then((response) => {
      nowPlayingMovies.value = response.data.results.splice(0, 16)
    })
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  fetchUpcomingMovies()
  fetchNowPlayingMovies()
})
</script>

<template>
  <div class="main-page">
    <BannerSwiper />

    <PageContainer>
      <MainSection title="Próximos lançamentos">
        <div class="main-page__movies-list">
          <MovieCard
            v-for="movie in upcomingMovies"
            :key="movie.id"
            :id="movie.id"
            :poster="movie.poster_path"
            :score="movie.vote_average"
            :title="movie.title"
            :releaseDate="movie.release_date"
          />
        </div>
      </MainSection>

      <MainSection title="Últimos lançamentos">
        <div class="main-page__movies-list">
          <MovieCard
            v-for="movie in nowPlayingMovies"
            :key="movie.id"
            :id="movie.id"
            :poster="movie.poster_path"
            :score="movie.vote_average"
            :title="movie.title"
            :releaseDate="movie.release_date"
          />
        </div>
      </MainSection>
    </PageContainer>
  </div>
</template>

<style lang="scss">
@import './MainPage.scss';
</style>
