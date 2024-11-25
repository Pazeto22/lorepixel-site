import { createRouter, createWebHistory } from 'vue-router'
const MainPage = () => import('@/pages/main-page/MainPage.vue')
const MovieDetails = () => import('@/pages/movie-details/MovieDetails.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage
    },
    {
      path: '/filme/:id',
      name: 'movie-details',
      component: MovieDetails
    }
  ]
})

export default router
