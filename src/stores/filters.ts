import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { usePlannerStore } from './planner'
import type { Plant } from '../types/plant'
import { months, formatMonth } from '../components/MonthComposable'

export const useFilterStore = defineStore('filters', () => {
  const plannerStore = usePlannerStore()
  const searchQuery = ref('')

  const filteredPlants = computed(() => {
    let filtered = plannerStore.plants || []

    type Plant = (typeof plannerStore.plants)[number]
    type Predicate = (p: Plant) => boolean | null

    // create array of filter predicates and remove nulls
    const fixedPredicates: Predicate[] = [
      filters.value.native ? (p: Plant) => p.nativity === 'N' : null,
      filters.value.bioreg ? (p: Plant) => p.nativity === 'BIOREG' : null,
      filters.value.commercial ? (p: Plant) => p.availability === 'C' : null,
      filters.value.nonCommercial ? (p: Plant) => p.availability === 'NC' : null,
      filters.value.hummingbirdAttractor ? (p: Plant) => p.hummingbirdAttractor : null,
      filters.value.birdNestHabitat ? (p: Plant) => p.birdNestHabitat : null,
      filters.value.specialValueNativeBees ? (p: Plant) => p.specialValueNativeBees : null,
      filters.value.extendedBloom ? (p: Plant) => p.extendedBloom : null,
      filters.value.hostPlant ? (p: Plant) => p.hostPlant : null,
      filters.value.pollinator ? (p: Plant) => p.pollinator : null,
    ].filter(Boolean) as Array<(p: Plant) => boolean>

    // add month predicates dynamically
    const monthPredicates: Predicate[] = months
      .filter((month) => filters.value[month])
      .map((month) => (p) => Boolean(p[month]))

    const activeFilters = [...monthPredicates, ...fixedPredicates]

    // get items where any predicate matches
    if (activeFilters.length) {
      filtered = filtered.filter((plant) => activeFilters.some((check) => check(plant)))
    }

    // Filter by search query
    if (searchQuery.value) {
      filtered = filtered.filter((resource) =>
        Object.values(resource).some((val) =>
          String(val).toLowerCase().includes(searchQuery.value.toLowerCase()),
        ),
      )
    }

    return filtered
  })

  const defaultFilters = {
    january: null,
    february: null,
    march: null,
    april: null,
    may: null,
    june: null,
    july: null,
    august: null,
    september: null,
    october: null,
    november: null,
    december: null,
    native: null,
    bioreg: null,
    commercial: null,
    nonCommercial: null,
    hummingbirdAttractor: null,
    pollinator: null,
    hostPlant: null,
    maricopaNativeSeedLibrary: null,
    containerFriendly: null,
    birdNestHabitat: null,
    specialValueNativeBees: null,
    extendedBloom: null,
  }

  const filters = ref(defaultFilters)

  function clearFilters() {
    filters.value = defaultFilters
  }

  return { searchQuery, filters, filteredPlants, clearFilters }
})
