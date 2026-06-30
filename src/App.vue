<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePlannerStore } from './stores/planner'
import PlantCard from './components/PlantCard.vue'

const plannerStore = usePlannerStore()
const searchQuery = ref('')
const showAdvancedFilters = ref(false)

const filteredPlants = computed(() => {
  let filtered = plannerStore.plants || []

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
  <div class="container">
    <h1>Maricopa County Pollinator Pathway Planner</h1>
    <p>
      This website is to assist in planning a pollinator garden using the
      <a href="https://libguides.maricopa.edu/seed/pathway" target="_blank"
        >Maricop Pollinator Pathway</a
      >
      certification. For more information about the Maricopa Pollinator Pathway program and the
      certification rules, please visit:
      <a href="https://libguides.maricopa.edu/seed/pathway" target="_blank"
        >https://libguides.maricopa.edu/seed/pathway</a
      >.
    </p>

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
        <div class="collapse" id="collapseFilters">Filters here</div>
      </div>
      <PlantCard
        v-for="(plant, index) in filteredPlants"
        :key="index"
        :item="plant"
        class="mb-3"
      ></PlantCard>
    </div>
  </div>
</template>

<style scoped></style>
