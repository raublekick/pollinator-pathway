<script setup lang="ts">
import { useFilterStore } from '../stores/filters'
import { usePlannerStore } from '@/stores/planner.ts'
import PlantCard from '../components/PlantCard.vue'
import LevelCard from './LevelCard.vue'
import { months, formatMonth } from './MonthComposable.ts'
const filterStore = useFilterStore()
const plannerStore = usePlannerStore()
</script>

<template>
  <h5>Participation levels</h5>
  <div class="row">
    <div class="col-lg-4 col-sm-12 py-1" v-for="(level, index) in plannerStore.levels" :key="index">
      <LevelCard :level="level" />
    </div>
  </div>

  <h5 class="pt-3">Monthly bloom coverage</h5>
  <div class="row">
    <div class="col-xl-1 col-lg-3 col-sm-4" v-for="(month, index) in months" :key="index">
      <dl>
        <dt>{{ formatMonth(month) }}</dt>
        <dd>{{ plannerStore.userMetrics.numberOfBloomsPerMonth[month] }}</dd>
      </dl>
    </div>
  </div>

  <h5 class="pt-3">Hosted larvae</h5>
  <div class="alert alert-info" v-if="!plannerStore.hostedLarva.length">
    Add larval host plants to see which bugs you'll be hosting.
  </div>
  <div>
    <span class="larva" v-for="(larva, index) in plannerStore.hostedLarva" :key="index">{{
      larva
    }}</span>
  </div>

  <h5 class="pt-3">My plants</h5>
  <div class="alert alert-info" v-if="!filterStore.filteredSelectedPlants.length">
    Add plants from the plant list tab to show them here.
  </div>
  <div>
    <PlantCard
      v-for="(plant, index) in filterStore.filteredSelectedPlants"
      :key="index"
      :item="plant"
      class="mb-3"
    ></PlantCard>
  </div>
</template>
<style lang="css">
.larva:after {
  content: ', ';
}
.larva:last-of-type:after {
  content: '';
}
</style>
