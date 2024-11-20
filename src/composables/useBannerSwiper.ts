import { ref } from 'vue'
import type { MovieType } from '@/types/movieType'

export function useBannerSwiper() {
  /**
   * Variável que controla a exibição do background desfocado
   */
  const displayBlurredBackground = ref(window.innerWidth > 1280)

  /**
   * Atualiza a variável displayBlurredBackground de acordo com a largura da tela
   */
  const updateViewportWidth = () => {
    displayBlurredBackground.value = window.innerWidth > 1280
  }

  return {
    displayBlurredBackground,
    updateViewportWidth
  }
}
