export interface ParticipantLevel {
  name: string | null
  requiredPlants: string[]
  minimumPollinators: number | null
  minimumHosts: number | null
  minimumHummingbirdHabitats: number | null
  minimumOtherBirdHabitats: number | null
  minimumContinuousBlooms: number | null
}
