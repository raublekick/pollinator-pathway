import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import data from './data.json'
import type { Plant } from '../types/plant'
import type { ParticipantLevel } from '../types/participantLevel'
import type { UserMetric } from '../types/userMetric'

export const usePlannerStore = defineStore('planner', () => {
  const plants = ref<Plant[]>(data as Plant[])
  const selectedPlants = ref<Plant[]>([])
  const requiredSpecies: string[] = ['Asclepias subulata']
  const selectedLevel = ref<ParticipantLevel | null>(null)

  const contributingLevel: ParticipantLevel = {
    name: 'Participant',
    requiredPlants: requiredSpecies,
    minimumPollinators: 0,
    minimumHosts: 0,
    minimumHummingbirdHabitats: 0,
    minimumOtherBirdHabitats: 0,
    minimumContinuousBlooms: 1,
  }

  const coreLevel: ParticipantLevel = {
    name: 'Core',
    requiredPlants: requiredSpecies,
    minimumPollinators: 5,
    minimumHosts: 3,
    minimumHummingbirdHabitats: 1,
    minimumOtherBirdHabitats: 0,
    minimumContinuousBlooms: 2,
  }

  const comprehensiveLevel: ParticipantLevel = {
    name: 'Comprehensive',
    requiredPlants: requiredSpecies,
    minimumPollinators: 9,
    minimumHosts: 7,
    minimumHummingbirdHabitats: 2,
    minimumOtherBirdHabitats: 1,
    minimumContinuousBlooms: 3,
  }

  const userMetrics = computed<UserMetric>(() => {
    // TODO: Change the JSON to have a "pollinator" attribute
    // TODO: Change the JSON to have a "larvalHost" attribute
    return {
      hasRequiredPlants: !!selectedPlants.value.filter(
        (p) => selectedLevel.value?.requiredPlants.filter((s) => s === p.scientificName).length,
      ).length,
      numberOfPollinators: selectedPlants.value.filter((p) => p.source === 'MCPP').length,
      numberOfHosts: selectedPlants.value.filter((p) => p.source === 'MCPPH').length,
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
    }
  })

  const verifyContributing = computed(() => {
    return selectedPlants.value.length
  })
  const verifyCore = computed(() => {
    return selectedPlants.value.length
  })
  const verifyComprehensive = computed(() => {
    return selectedPlants.value.length
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
    contributingLevel,
    coreLevel,
    comprehensiveLevel,
    userMetrics,
    matchPlants,
  }
})
