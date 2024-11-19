<script setup lang="ts">
// Componentes
import { PageContainer } from '@/components/layout'

import LorePixelLogo from '@/components/icons/LorePixelLogo.vue'
</script>

<template>
  <div class="nav-bar">
    <PageContainer>
      <div class="nav-bar__logo">
        <img src="@/assets/logo-3.png" alt="logo" />
        <LorePixelLogo />
      </div>
    </PageContainer>
  </div>
</template>

<style lang="scss">
@import './NavBar.scss';
</style>
