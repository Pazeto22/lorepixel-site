import { ref } from 'vue'
import api from '@/config/api'
import type { MovieType } from '@/types/movieType'

export function useBannerSwiper() {
  /**
   * Variável que controla a exibição do background desfocado
   */
  const displayBlurredBackground = ref(window.innerWidth > 1280)

  /**
   * Array com os 5 filmes mais populares
   */
  const popularBanners = ref<MovieType[]>([])

  /**
   * Atualiza a variável displayBlurredBackground de acordo com a largura da tela
   */
  const updateViewportWidth = () => {
    displayBlurredBackground.value = window.innerWidth > 1280
  }

  /**
   * Busca na API os 5 filmes mais populares para exibir nos banners
   */
  const getFiveBanners = async (): Promise<void> => {
    const params = new URLSearchParams({
      language: 'pt-BR',
      page: '1',
      sort_by: 'popularity.desc'
    })

    try {
      await api.get(`discover/movie`, { params }).then((response) => {
        popularBanners.value = response.data.results.slice(0, 5)
      })
    } catch (err) {
      console.error(err)
    }
  }

  return {
    displayBlurredBackground,
    popularBanners,
    updateViewportWidth,
    getFiveBanners
  }
}
