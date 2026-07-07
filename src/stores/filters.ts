import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { usePlannerStore } from './planner'
import { months } from '../components/MonthComposable'

export const useFilterStore = defineStore('filters', () => {
  const plannerStore = usePlannerStore()
  const searchQuery = ref('')

  type Plant = (typeof plannerStore.plants)[number]
  type Predicate = (p: Plant) => boolean | null

  const createDefaultFilters = () => ({
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
  })

  const filters = ref(createDefaultFilters())

  function clearFilters() {
    filters.value = createDefaultFilters()
  }

  const activeFilters = computed(() => {
    // Build predicates from current state so any checkbox toggle recomputes filtered lists.
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

    const monthPredicates: Predicate[] = months
      .filter((month) => filters.value[month])
      .map((month) => (p) => Boolean(p[month]))

    return [...monthPredicates, ...fixedPredicates]
  })

  function applySelectedFilters(plants: Plant[]): Plant[] {
    return plants.filter((plant) => activeFilters.value.some((check) => check(plant)))
  }

  function applySearchQuery(plants: Plant[]): Plant[] {
    return plants.filter((plant) =>
      Object.values(plant).some((val) =>
        String(val).toLowerCase().includes(searchQuery.value.toLowerCase()),
      ),
    )
  }

  function applyFilterPipeline(items: Plant[]): Plant[] {
    let filtered = items

    // get items where any predicate matches
    if (activeFilters.value.length) {
      filtered = applySelectedFilters(filtered)
    }

    // Filter by search query
    if (searchQuery.value) {
      filtered = applySearchQuery(filtered)
    }

    return filtered
  }

  const filteredPlants = computed<Plant[]>(() => {
    const plants = plannerStore.plants || []
    return applyFilterPipeline(plants)
  })

  const filteredSelectedPlants = computed<Plant[]>(() => {
    const plants = plannerStore.selectedPlants || []
    return applyFilterPipeline(plants)
  })

  return { searchQuery, filters, filteredPlants, filteredSelectedPlants, clearFilters }
})
