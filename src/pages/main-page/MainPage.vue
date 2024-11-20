<script setup lang="ts">
import { onMounted } from 'vue'
import { PageContainer } from '@/components/layout'
import { BannerSwiper, MainSection, MovieCard } from '@/components'
import { useFetchMovies } from '@/composables'

const { fetchNowPlayingMovies, fetchUpcomingMovies, upcomingMovies, nowPlayingMovies } =
  useFetchMovies()

onMounted(() => {
  fetchUpcomingMovies(8)
  fetchNowPlayingMovies(16)
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
