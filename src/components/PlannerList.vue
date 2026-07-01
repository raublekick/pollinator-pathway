<script setup lang="ts">
import { useFilterStore } from '../stores/filters'
import PlantCard from '../components/PlantCard.vue'

const filterStore = useFilterStore()
</script>

<template>
  <div>
    <PlantCard
      v-for="(plant, index) in filterStore.filteredPlants"
      :key="index"
      :item="plant"
      class="mb-3"
    ></PlantCard>
  </div>
</template>
