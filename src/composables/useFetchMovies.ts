import { ref } from 'vue'
import api from '@/config/api'
import type { MovieType, MovieDetailsType, MovieCreditsType } from '@/types'

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
   * Detalhes de um filme
   */
  const movieDetails = ref<MovieDetailsType>()

  /**
   * Créditos de um filme
   */
  const movieCredits = ref<MovieCreditsType>()

  /**
   * Parâmetros para a busca de filmes na API
   */
  const fetchParams = new URLSearchParams({
    language: 'pt-BR',
    region: 'BR',
    page: '1'
  })

  /**
   * Busca na API uma quantidade definida de filmes que ainda não foram lançados
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
   * Busca na API uma quantidade definida de filmes que estão em cartaz
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
   * Busca na API uma quantidade definida de filmes mais populares
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

  /**
   * Busca na API os detalhes de um filme
   */
  const fetchMovieDetails = async (movieId: number | string): Promise<void> => {
    try {
      await api.get(`movie/${movieId}`, { params: fetchParams }).then((response) => {
        movieDetails.value = response.data
      })
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Busca na API os créditos de um filme
   */
  const fetchMovieCredits = async (movieId: number | string): Promise<void> => {
    try {
      await api.get(`movie/${movieId}/credits`, { params: fetchParams }).then((response) => {
        console.log(response.data)
        movieCredits.value = response.data
      })
    } catch (err) {
      console.error(err)
    }
  }

  return {
    fetchNowPlayingMovies,
    fetchUpcomingMovies,
    fetchPopularMovies,
    fetchMovieDetails,
    fetchMovieCredits,
    nowPlayingMovies,
    upcomingMovies,
    popularMovies,
    movieDetails,
    movieCredits
  }
}
