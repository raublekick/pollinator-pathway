<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePlannerStore } from '../stores/planner'
import PlantCard from '../components/PlantCard.vue'
import { months, formatMonth } from '../components/MonthComposable'

const plannerStore = usePlannerStore()
const searchQuery = ref('')
const showAdvancedFilters = ref(false)

const filters = ref({
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
</script>

<template>
  <div>
    <div class="mb-3">
      <label for="search-input" class="visually-hidden">Search plants</label>
      <input
        id="search-input"
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Search plants..."
        aria-label="Search plants"
        role="searchbox"
      />
    </div>
    <div class="mb-3">
      <a
        class=""
        data-bs-toggle="collapse"
        href="#collapseFilters"
        role="button"
        aria-expanded="false"
        aria-controls="collapseFilters"
        @click="showAdvancedFilters = !showAdvancedFilters"
        >{{ showAdvancedFilters ? 'Hide advanced filters' : 'Show advanced filters' }}</a
      >
      <div class="collapse" id="collapseFilters">
        <div class="row">
          <div class="col-auto">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="checkNative"
                v-model="filters.native"
              />
              <label class="form-check-label" for="checkNative"> Native</label>
            </div>

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="checkBioreg"
                v-model="filters.bioreg"
              />
              <label class="form-check-label" for="checkBioreg">Regional</label>
            </div>
          </div>

          <div class="col-auto">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="checkCommercial"
                v-model="filters.commercial"
              />
              <label class="form-check-label" for="checkCommercial"> Commercially available</label>
            </div>

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="checkNoncommercial"
                v-model="filters.nonCommercial"
              />
              <label class="form-check-label" for="checkNoncommercial"
                >Not commercially available</label
              >
            </div>
          </div>

          <div class="col-auto">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="checkHummingbirds"
                v-model="filters.hummingbirdAttractor"
              />
              <label class="form-check-label" for="checkHummingbirds">Attracts hummingbirds</label>
            </div>

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="checkBirds"
                v-model="filters.birdNestHabitat"
              />
              <label class="form-check-label" for="checkBirds">Bird nest habitat</label>
            </div>
          </div>
          <div class="col-auto">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="checkNativeBeeds"
                v-model="filters.specialValueNativeBees"
              />
              <label class="form-check-label" for="checkNativeBees"
                >Special value to native bees</label
              >
            </div>
          </div>

          <div class="col-auto">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="checkExtendedBloom"
                v-model="filters.extendedBloom"
              />
              <label class="form-check-label" for="checkExtendedBloom">Extended bloom</label>
            </div>
          </div>

          <div class="col-auto">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="checkPollinator"
                v-model="filters.pollinator"
              />
              <label class="form-check-label" for="checkPollinator">Pollinator</label>
            </div>

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                id="checkHost"
                v-model="filters.hostPlant"
              />
              <label class="form-check-label" for="checkHost">Host plant</label>
            </div>
          </div>
        </div>

        <div class="fw-bold">Bloom months:</div>
        <div class="row">
          <div class="col-xxl-1 col-xl-3 col-md-3 col-sm-3" v-for="month in months" :key="month">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`check${month}`"
                v-model="filters[month]"
              />
              <label class="form-check-label" :for="`check${month}`">{{
                formatMonth(month)
              }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PlantCard
      v-for="(plant, index) in filteredPlants"
      :key="index"
      :item="plant"
      class="mb-3"
    ></PlantCard>
  </div>
</template>
