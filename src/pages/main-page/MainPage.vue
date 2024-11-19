<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '@/config/api'

import { PageContainer } from '@/components/layout'
import { BannerSwiper, MainSection, ItemCard } from '@/components'

import type { MovieType } from '@/types/movieType'

const nowPlayingMovies = ref<MovieType[]>([])

/**
 * Busca na API os 5 filmes mais populares para exibir nos banners
 */
const getNowPlayingMovies = async (): Promise<void> => {
  const params = new URLSearchParams({
    language: 'pt-BR',
    region: 'BR',
    page: '1'
  })

  try {
    await api.get(`movie/now_playing`, { params }).then((response) => {
      nowPlayingMovies.value = response.data.results
    })
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  getNowPlayingMovies()
})
</script>

<template>
  <div class="main-page">
    <BannerSwiper />

    <PageContainer>
      <MainSection title="Últimos lançamentos">
        <div class="main-page__movies-list">
          <ItemCard
            v-for="movie in nowPlayingMovies"
            :key="movie.id"
            :id="movie.id"
            :genres="movie.genre_ids"
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
