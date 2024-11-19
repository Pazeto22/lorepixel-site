/**
 * Declaração de tipos para corrigir conflitos de TypeScript com a biblioteca `circle-progress.vue`.
 * Resolve o problema de interpretação do nome como arquivo `.vue`, permitindo a importação de
 * CircleProgressBar sem erros.
 */

declare module 'circle-progress.vue' {
  import { DefineComponent } from 'vue'
  export const CircleProgressBar: DefineComponent<{}, {}, any>
}
