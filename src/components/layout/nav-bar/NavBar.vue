<script setup lang="ts">
// Componentes
import { PageContainer } from '@/components/layout'
// Ícones
import LorePixelLogo from '@/components/icons/LorePixelLogo.vue'
</script>

<template>
  <div class="nav-bar">
    <page-container>
      <div class="nav-bar--logo">
        <lore-pixel-logo />
      </div>
    </page-container>
  </div>
</template>

<style lang="scss">
@import './NavBar.scss';
</style>
