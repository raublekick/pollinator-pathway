export interface MonthMetric {
  january: number
  february: number
  march: number
  april: number
  may: number
  june: number
  july: number
  august: number
  september: number
  october: number
  november: number
  december: number
}

export interface UserMetric {
  numberOfPollinators: number
  numberOfHosts: number
  numberOfHummingbirdHabitats: number
  numberOfOtherBirdHabitats: number
  numberOfBloomsPerMonth: MonthMetric
  minNumberOfBloomsPerMonth: number
  maxNumberOfBloomsPerMonth: number
}
