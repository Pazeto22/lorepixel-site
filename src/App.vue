<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NavBar } from '@/components/ui'
</script>

<template>
  <header>
    <nav-bar />
  </header>

  <RouterView />
</template>
