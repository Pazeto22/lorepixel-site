<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NavBar } from '@/components/layout'
</script>

<template>
  <header>
    <nav-bar />
  </header>

  <RouterView />
</template>

<style>
@import 'floating-vue/dist/style.css';
</style>
