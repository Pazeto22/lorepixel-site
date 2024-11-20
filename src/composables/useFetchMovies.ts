import { ref } from 'vue'
import api from '@/config/api'
import type { MovieType } from '@/types/movieType'

export function useFetchMovies() {
  /**
   * Lista de próximos lançamentos
   */
  const upcomingMovies = ref<MovieType[]>([])

  /**
   * Lista de filmes em cartaz
   */
  const nowPlayingMovies = ref<MovieType[]>([])

  /**
   * Busca na API os 8 próximos lançamentos para exibir na seção de próximos lançamentos
   */
  const fetchUpcomingMovies = async (): Promise<void> => {
    const params = new URLSearchParams({
      language: 'pt-BR',
      region: 'BR',
      page: '1'
    })

    try {
      await api.get(`movie/upcoming`, { params }).then((response) => {
        const upcomingResponse = response.data.results.splice(0, 8)
        upcomingMovies.value = upcomingResponse.sort((a: MovieType, b: MovieType) => {
          return new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
        })
      })
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Busca na API os 5 filmes mais populares para exibir nos banners
   */
  const fetchNowPlayingMovies = async (): Promise<void> => {
    const params = new URLSearchParams({
      language: 'pt-BR',
      region: 'BR',
      page: '1'
    })

    try {
      await api.get(`movie/now_playing`, { params }).then((response) => {
        nowPlayingMovies.value = response.data.results.splice(0, 16)
      })
    } catch (err) {
      console.error(err)
    }
  }

  return { fetchNowPlayingMovies, fetchUpcomingMovies, upcomingMovies, nowPlayingMovies }
}
