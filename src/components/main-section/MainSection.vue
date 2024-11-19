<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Seção'
  }
})
</script>

<template>
  <div class="main-section">
    <div class="main-section__title">
      <h2>{{ props.title }}</h2>
    </div>

    <div class="main-section__body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import './MainSection.scss';
</style>
