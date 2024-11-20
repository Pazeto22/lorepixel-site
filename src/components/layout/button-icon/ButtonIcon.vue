<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  onClick: {
    type: Function as PropType<(event: MouseEvent) => any>,
    default: () => {}
  },
  tooltip: {
    type: [String, Boolean] as PropType<string | boolean>,
    default: false
  }
})
</script>

<template>
  <div class="button-icon">
    <button @click="props.onClick" :v-tooltip="tooltip" class="button-icon">
      <slot />
    </button>
  </div>
</template>

<style lang="scss">
@import './ButtonIcon.scss';
</style>
