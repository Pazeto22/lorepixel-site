<script setup lang="ts">
import dayjs from 'dayjs'
import { computed } from 'vue'
import { useFetchMovies } from '@/composables'
import { tmdbMediaUrl } from '@/config/constants'
import { PageContainer, ButtonIcon } from '@/components/layout'
import { ScoreBar } from '@/components'
import type { MovieDetailsType } from '@/types'

// Ícones
import PlusCircle from 'vue-material-design-icons/PlusCircle.vue'
import JustWatchLogo from '@/components/icons/JustWatchLogo.vue'

const props = defineProps({
  movieDetails: {
    type: Object as () => MovieDetailsType,
    required: true
  },
  director: {
    type: String,
    default: ''
  }
})

/**
 * Título do filme.
 */
const title = computed(() => {
  return props.movieDetails.title
})

/**
 * Ano de lançamento do filme
 */
const releaseYear = computed(() => {
  return props.movieDetails.release_date.split('-')[0]
})

/**
 * Data completa de lançamento do filme
 */
const ReleaseDate = computed(() => {
  return dayjs(props.movieDetails.release_date).format('DD/MM/YYYY')
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

/**
 * Pega todos os gêneros do filme e coloca-os numa mesma string separado por vírgula
 */
const genres = computed(() => {
  if (!props.movieDetails.genres) {
    return ''
  }

  return props.movieDetails.genres.map((genre) => genre.name).join(', ')
})

const productionCompanies = computed(() => {
  if (!props.movieDetails.production_companies) {
    return ''
  }

  return props.movieDetails.production_companies.map((company) => company.name).join(', ')
})

/**
 * Converte minutos para horas e minutos.
 */
function convertMinutesToHours(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}min`
}

/**
 * Abre o JustWatch com a busca do filme.
 */
function sendToJustWatch() {
  window.open(`https://www.justwatch.com/br/busca?q=${props.movieDetails.title}`, '_blank')
}

/**
 * Função pegadinha para o botão de adicionar à lista
 */
const trickyFunction = (event: MouseEvent) => {
  event.stopPropagation()
  alert('Clica não, carai!')
}
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
              <span> ({{ releaseYear }}) </span>
            </h2>
            <div class="movie-details-banner__more-info">
              {{ ReleaseDate }} - {{ genres }} -
              {{ convertMinutesToHours(props.movieDetails.runtime) }}
            </div>
            <div class="movie-details-banner__score">
              <div class="movie-details-banner__my-score">
                <ScoreBar />
                <span>Sua<br />nota</span>
              </div>
              <div class="movie-details-banner__average-score">
                <ScoreBar :score="props.movieDetails.vote_average" />
                <span>Nota dos<br />usuários</span>
              </div>
            </div>
            <div class="movie-details-banner__actions">
              <ButtonIcon :on-click="trickyFunction" tooltip="Adicione a sua lista">
                <PlusCircle />
              </ButtonIcon>
              <ButtonIcon :on-click="sendToJustWatch" tooltip="Onde assistir">
                <JustWatchLogo />
              </ButtonIcon>
            </div>
            <div class="movie-details-banner__details">
              <div class="movie-details-banner__detail-item">
                <span>Título original:</span>
                {{ props.movieDetails.original_title }}
              </div>
              <div class="movie-details-banner__detail-item">
                <span>Sinopse:</span>
                <p>{{ props.movieDetails.overview }}</p>
              </div>
              <div class="movie-details-banner__detail-item">
                <span>Diretor:</span> {{ props.director }}
              </div>
              <div class="movie-details-banner__detail-item">
                <span>Produtora:</span> {{ productionCompanies }}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  </div>
</template>

<style lang="scss">
@import './MovieDetailsBanner.scss';
</style>
