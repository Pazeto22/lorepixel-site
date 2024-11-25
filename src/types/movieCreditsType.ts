import type { CastType } from './castType'
import type { CrewType } from './crewType'

export interface MovieCreditsType {
  id: number
  cast: CastType[]
  crew: CrewType[]
}
