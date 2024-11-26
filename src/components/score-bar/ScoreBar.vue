<script setup lang="ts">
import { computed, ref } from 'vue'
import { CircleProgressBar } from 'circle-progress.vue'

const props = defineProps({
  score: {
    type: Number,
    default: 0
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
</script>

<template>
  <div class="score-bar">
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
</template>

<style lang="scss">
@import './ScoreBar.scss';
</style>
