import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/pages/home/home.vue';

const routes = [
  { path: '', name: 'home', component: Home },
  { path: '/teste', name: 'teste', component: Home },
];

const router = new createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
