<script setup lang="ts">
import Menu from 'vue-material-design-icons/Menu.vue'
import { PageContainer } from '@/components/layout'
import LorePixelLogo from '@/components/icons/LorePixelLogo.vue'
import { ButtonIcon } from '@/components/layout'
</script>

<template>
  <div class="nav-bar">
    <PageContainer>
      <div class="nav-bar__content">
        <div class="nav-bar__logo">
          <img src="@/assets/logo.png" alt="logo" />
          <LorePixelLogo />
        </div>
        <div class="nav-bar__mobile">
          <ButtonIcon>
            <Menu class="nav-bar__menu-icon" />
          </ButtonIcon>
        </div>
      </div>
    </PageContainer>
  </div>
</template>

<style lang="scss">
@import './NavBar.scss';
</style>
