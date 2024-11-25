<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { CircleProgressBar } from 'circle-progress.vue'

import { tmdbMediaUrl } from '@/config/constants'
import { ButtonIcon } from '@/components/layout'
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
 * Score do filme
 */
// Se a nota for 0, enviar "S/N" (Sem Nota)
const movieScore = computed(() => {
  if (props.score === 0) {
    return 'S/N'
  } else {
    return props.score.toFixed(1)
  }
})

/**
 * Formata a data de lançamento do filme
 */
const formattedReleaseDate = ref(dayjs(props.releaseDate).format('DD/MM/YYYY'))

/**
 * Cor do círculo não preenchido
 */
const backColor = ref('#f1f1f1')

/**
 * Cor do círculo preenchido
 */
const filledColor = ref('#3586b5')

/**
 * Retorna a cor do círculo de acordo com a nota do filme
 */
const getUnfilledColor = () => {
  if (props.score >= 8) {
    return '#4caf50'
  } else if (props.score >= 5) {
    return '#ff9800'
  } else {
    return '#f44336'
  }
}

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
const trickyFunction = () => {
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

          <CircleProgressBar
            :value="props.score"
            :max="10"
            :size="48"
            strokeWidth="8"
            :startAngle="360"
            :color-unfilled="getUnfilledColor()"
            :color-filled="filledColor"
            :color-back="backColor"
          >
            {{ movieScore }}
          </CircleProgressBar>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './MovieCard.scss';
</style>
