import type { BaseOptions } from 'vm'

export interface ParticipantLevel {
  name: string | null
  description: string | null
  requiredPlants: string[]
  minimumPollinators: number
  minimumHosts: number
  minimumHummingbirdHabitats: number
  minimumOtherBirdHabitats: number
  minimumContinuousBlooms: number
}

export interface ParticipantLevelMetric {
  name: string | null
  requiredPlants: string[] | null
  hasRequiredPlants: boolean
  hasNumberOfPollinators: boolean
  hasNumberOfHosts: boolean
  hasNumberOfHummingbirdHabitats: boolean
  hasNumberOfOtherBirdHabitats: boolean
  hasBloomsPerMonth: boolean
}
