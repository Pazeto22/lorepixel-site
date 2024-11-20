<script setup lang="ts">
import LorePixelLogo from '@/components/icons/LorePixelLogo.vue'
import { ref } from 'vue'

/**
 * Recebe o ano atual
 */
const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <div class="page-footer">
    <div class="page-footer__content">
      <div class="page-footer__logo">
        <img src="@/assets/logo.png" alt="logo" />
        <LorePixelLogo />
      </div>
    </div>

    <p>
      <a class="page-footer__copyright" href="https://github.com/pazeto22" target="_blank">
        &copy; {{ currentYear }} - Gustavo Pazeto
      </a>
    </p>
  </div>
</template>

<style lang="scss">
@import './PageFooter.scss';
</style>
