<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

import { tmdbMediaUrl } from '@/config/constants'
import { ScoreBar } from '@/components'
import { ButtonIcon } from '@/components/layout'

// Ícones
import PlusCircle from 'vue-material-design-icons/PlusCircle.vue'

const router = useRouter()

const props = defineProps({
  movieId: {
    type: [String, Number],
    default: ''
  },
  poster: {
    type: String,
    default: ''
  },
  score: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: 'Não encontrado'
  },
  releaseDate: {
    type: String,
    default: '00/00/0000'
  }
})

/**
 * Formata a data de lançamento do filme
 */
const formattedReleaseDate = ref(dayjs(props.releaseDate).format('DD/MM/YYYY'))

/**
 * Redireciona para a página de detalhes do filme
 */
const toMovieDetails = () => {
  const movieId = props.movieId
  router.push({ name: 'movie-details', params: { id: movieId } })
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
  <div class="movie-card">
    <div @click="toMovieDetails()" class="movie-card__wrapper">
      <figure class="movie-card__figure">
        <slot name="image">
          <img
            class="movie-card__figure-img"
            :src="`${tmdbMediaUrl}/${props.poster}`"
            :alt="`Poster do filme ${props.title}`"
          />
        </slot>
      </figure>

      <div class="movie-card__contents">
        <span class="movie-card__title"> {{ props.title }} </span>
        <p class="movie-card__description mb-2">
          {{ formattedReleaseDate }}
        </p>

        <div class="movie-card__bottom">
          <ButtonIcon :on-click="trickyFunction" tooltip="Adicione a sua lista">
            <PlusCircle />
          </ButtonIcon>

          <ScoreBar :score="props.score" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './MovieCard.scss';
</style>
