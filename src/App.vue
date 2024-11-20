<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NavBar, PageFooter } from '@/components/layout'
</script>

<template>
  <header>
    <NavBar />
  </header>

  <RouterView />

  <footer>
    <PageFooter />
  </footer>
</template>

<style>
@import 'floating-vue/dist/style.css';
</style>
