<script setup lang="ts">
import { RouterView } from 'vue-router'
import { PageContainer } from '@/components/ui'
import { NavBar } from '@/components/ui'
</script>

<template>
  <header>
    <nav-bar />
  </header>

  <page-container>
    <RouterView />
  </page-container>
</template>
