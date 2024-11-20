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
   * Lista de filmes mais populares
   */
  const popularMovies = ref<MovieType[]>([])

  /**
   * Parâmetros para a busca de filmes na API
   */
  const fetchParams = new URLSearchParams({
    language: 'pt-BR',
    region: 'BR',
    page: '1'
  })

  /**
   * Busca na API os 8 próximos lançamentos para exibir na seção de próximos lançamentos
   */
  const fetchUpcomingMovies = async (quantity?: number): Promise<void> => {
    try {
      await api.get(`movie/upcoming`, { params: fetchParams }).then((response) => {
        let upcomingResponse = response.data.results

        if (quantity && quantity > 0) {
          upcomingResponse = upcomingResponse.splice(0, quantity)
        }

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
  const fetchNowPlayingMovies = async (quantity?: number): Promise<void> => {
    try {
      await api.get(`movie/now_playing`, { params: fetchParams }).then((response) => {
        let upcomingResponse = response.data.results

        if (quantity && quantity > 0) {
          upcomingResponse = upcomingResponse.splice(0, quantity)
        }

        nowPlayingMovies.value = upcomingResponse
      })
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Busca na API os 5 filmes mais populares para exibir nos banners
   */
  const fetchPopularMovies = async (quantity?: number): Promise<void> => {
    try {
      await api.get(`movie/popular`, { params: fetchParams }).then((response) => {
        let upcomingResponse = response.data.results

        if (quantity && quantity > 0) {
          upcomingResponse = upcomingResponse.splice(0, quantity)
        }

        popularMovies.value = upcomingResponse
      })
    } catch (err) {
      console.error(err)
    }
  }

  return {
    fetchNowPlayingMovies,
    fetchUpcomingMovies,
    fetchPopularMovies,
    nowPlayingMovies,
    upcomingMovies,
    popularMovies
  }
}
