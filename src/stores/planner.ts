import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import data from './data.json'
import type { Plant } from '../types/plant'
import type { ParticipantLevel } from '../types/participantLevel'
import type { UserMetric } from '../types/userMetric'
import type { ParticipantLevelMetric } from '../types/participantLevel'
import { months } from '@/components/MonthComposable'

export const usePlannerStore = defineStore('planner', () => {
  const plants = ref<Plant[]>(data as Plant[])
  const selectedPlants = ref<Plant[]>([])
  const requiredSpecies: string[] = ['Asclepias subulata']
  const selectedLevel = ref<ParticipantLevel | null>(null)

  const contributingLevel: ParticipantLevel = {
    name: 'Participant',
    description: '',
    requiredPlants: requiredSpecies,
    minimumPollinators: 1,
    minimumHosts: 0,
    minimumHummingbirdHabitats: 0,
    minimumOtherBirdHabitats: 0,
    minimumContinuousBlooms: 1,
  }

  const coreLevel: ParticipantLevel = {
    name: 'Core',
    description: '',
    requiredPlants: requiredSpecies,
    minimumPollinators: 5,
    minimumHosts: 3,
    minimumHummingbirdHabitats: 1,
    minimumOtherBirdHabitats: 0,
    minimumContinuousBlooms: 2,
  }

  const comprehensiveLevel: ParticipantLevel = {
    name: 'Comprehensive',
    description: '',
    requiredPlants: requiredSpecies,
    minimumPollinators: 9,
    minimumHosts: 7,
    minimumHummingbirdHabitats: 2,
    minimumOtherBirdHabitats: 1,
    minimumContinuousBlooms: 3,
  }

  const levels = [contributingLevel, coreLevel, comprehensiveLevel]

  const hostedLarva = computed<string[]>(() => {
    const unique = [
      // use Set to get unique items in the end
      ...new Set(
        selectedPlants.value
          // map the hostFor strings
          .map((p) => p.hostFor)
          // remove nulls and empties
          .filter((h): h is string => !!h)
          // flatten out strings like "Insect1, Insect2" into individual entries
          .flatMap((h) => h.split(','))
          // trim the results
          .map((name) => name.trim())
          // get rid of empties
          .filter((name) => name.length > 0),
      ),
    ]
    return unique.sort((a, b) => a.localeCompare(b))
  })

  const userMetrics = computed<UserMetric>(() => {
    // TODO: Change the JSON to have a "pollinator" attribute
    // TODO: Change the JSON to have a "larvalHost" attribute

    const bloomMonthCounts = months.map((month) => {
      return selectedPlants.value.filter((p) => p[month]).length
    })
    const minBloomsPerMonth = Math.min(...bloomMonthCounts) ?? 0
    const maxBloomsPerMonth = Math.max(...bloomMonthCounts) ?? 0

    return {
      numberOfPollinators: selectedPlants.value.filter((p) => p.pollinator).length,
      numberOfHosts: selectedPlants.value.filter((p) => p.hostPlant).length,
      numberOfHummingbirdHabitats: selectedPlants.value.filter((p) => p.hummingbirdAttractor)
        .length,
      numberOfOtherBirdHabitats: selectedPlants.value.filter((p) => p.birdNestHabitat).length,
      numberOfBloomsPerMonth: {
        january: selectedPlants.value.filter((p) => p.january).length,
        february: selectedPlants.value.filter((p) => p.february).length,
        march: selectedPlants.value.filter((p) => p.march).length,
        april: selectedPlants.value.filter((p) => p.april).length,
        may: selectedPlants.value.filter((p) => p.may).length,
        june: selectedPlants.value.filter((p) => p.june).length,
        july: selectedPlants.value.filter((p) => p.july).length,
        august: selectedPlants.value.filter((p) => p.august).length,
        september: selectedPlants.value.filter((p) => p.september).length,
        october: selectedPlants.value.filter((p) => p.october).length,
        november: selectedPlants.value.filter((p) => p.november).length,
        december: selectedPlants.value.filter((p) => p.december).length,
      },
      minNumberOfBloomsPerMonth: minBloomsPerMonth,
      maxNumberOfBloomsPerMonth: maxBloomsPerMonth,
    }
  })

  const levelMetrics = computed<ParticipantLevelMetric[]>(() => {
    const metrics: ParticipantLevelMetric[] = []
    levels.forEach((level) => {
      const userMonthValues = Object.values(userMetrics.value.numberOfBloomsPerMonth).map(Number)
      const minBloomsPerMonth = userMonthValues.length ? Math.min(...userMonthValues) : 0
      const maxBloomsPerMonth = userMonthValues.length ? Math.max(...userMonthValues) : 0
      const levelMetric: ParticipantLevelMetric = {
        name: level.name,
        requiredPlants:
          level.requiredPlants.filter((s) =>
            selectedPlants.value.some((p) => p.scientificName === s),
          ) ?? null,
        hasRequiredPlants:
          level.requiredPlants.filter((s) =>
            selectedPlants.value.some((p) => p.scientificName === s),
          ).length === level.requiredPlants.length,
        hasNumberOfPollinators: level.minimumPollinators <= userMetrics.value.numberOfPollinators,
        hasNumberOfHosts: level.minimumHosts <= userMetrics.value.numberOfHosts,
        hasNumberOfHummingbirdHabitats:
          level.minimumHummingbirdHabitats <= userMetrics.value.numberOfHummingbirdHabitats,
        hasNumberOfOtherBirdHabitats:
          level.minimumOtherBirdHabitats <= userMetrics.value.numberOfOtherBirdHabitats,

        hasBloomsPerMonth:
          userMetrics.value.minNumberOfBloomsPerMonth >= level.minimumContinuousBlooms,
      }
      metrics.push(levelMetric)
    })
    return metrics
  })

  function matchPlants(first: Plant, second: Plant) {
    return first.commonName === second.commonName && first.scientificName == second.scientificName
  }

  function addPlant(plant: Plant) {
    // verify that the plant does not already exist
    if (!selectedPlants.value.filter((p) => matchPlants(p, plant)).length) {
      selectedPlants.value.push(plant)
    }
  }

  function removePlant(plant: Plant) {
    const index = selectedPlants.value.findIndex((item) => matchPlants(item, plant))
    if (index > -1) {
      selectedPlants.value.splice(index, 1)
    }
  }

  return {
    plants,
    selectedPlants,
    addPlant,
    removePlant,
    levels,
    userMetrics,
    selectedLevel,
    levelMetrics,
    matchPlants,
    hostedLarva,
  }
})
