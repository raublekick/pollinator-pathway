<script setup lang="ts">
import { useFilterStore } from '../stores/filters'
import { usePlannerStore } from '@/stores/planner.ts'
import PlantCard from '../components/PlantCard.vue'

const filterStore = useFilterStore()
const plannerStore = usePlannerStore()
</script>

<template>
  <div>
    <PlantCard
      v-for="(plant, index) in filterStore.filteredSelectedPlants"
      :key="index"
      :item="plant"
      class="mb-3"
    ></PlantCard>
  </div>
</template>
