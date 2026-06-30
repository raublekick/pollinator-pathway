export interface Plant {
  type: string
  commonName: string
  scientificName: string
  january: boolean | null
  february: boolean | null
  march: boolean | null
  april: boolean | null
  may: boolean | null
  june: boolean | null
  july: boolean | null
  august: boolean | null
  september: boolean | null
  october: boolean | null
  november: boolean | null
  december: boolean | null
  nativity: string
  availability: string
  notes: string | null
  hummingbirdAttractor: boolean | null
  hostPlant: boolean | null
  maricopaNativeSeedLibrary: boolean | null
  containerFriendly: boolean | null
  birdNestHabitat: boolean | null
  specialValueNativeBees: boolean | null
  extendedBloom: boolean | null
  source: string
  pollinator: string | null
  hostPlantWeight: string | null
  hostFor: string | null
}
