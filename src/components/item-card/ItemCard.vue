<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  genres: {
    type: String,
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
 * URL base para as imagens do TMDB
 */
const tmdbMediaUrl = 'https://image.tmdb.org/t/p/original'
</script>

<template>
  <div class="item-card">
    <div class="item-card__wrapper">
      <figure class="item-card__figure">
        <slot name="image">
          <img
            class="item-card__figure-img"
            :src="`${tmdbMediaUrl}/${props.poster}`"
            :alt="`Poster do filme ${props.title}`"
          />
        </slot>
      </figure>

      <div class="item-card__contents">
        <span class="item-card__title"> {{ props.title }} </span>
        <p class="item-card__description mb-2">
          {{ formattedReleaseDate }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './ItemCard.scss';
</style>
