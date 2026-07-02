<script setup lang="ts">
import { computed } from 'vue'
import type { ParticipantLevel } from '@/types/participantLevel'
import type { ParticipantLevelMetric } from '@/types/participantLevel'
import { usePlannerStore } from '@/stores/planner'
const props = defineProps<{
  level: ParticipantLevel
}>()

const plannerStore = usePlannerStore()

const levelMetric = computed<ParticipantLevelMetric | null>(() => {
  const metric = plannerStore.levelMetrics.find((l) => l.name === props.level.name) ?? null
  if (metric) {
    return metric
  }
})
</script>
<template>
  <div class="card position-relative plant-card">
    <!-- <div class="card-header"></div> -->
    <div class="card-body ps-3 pe-3">
      <h5 class="card-title">{{ level.name }}</h5>
      <ul class="list-group list-group-flush">
        <li class="list-group-item px-0">
          <span class="fw-bold">Required plants</span>

          <div class="float-end text-end">
            <span
              v-for="(species, index) in level.requiredPlants"
              :key="index"
              :class="[
                levelMetric?.requiredPlants?.find((p) => p === species) ? 'text-success' : '',
              ]"
            >
              {{ species }}</span
            >
          </div>
        </li>
        <li class="list-group-item px-0">
          <span class="fw-bold"># of larval host plants</span>
          <span
            class="text-end float-end"
            :class="[levelMetric?.hasNumberOfHosts ? 'text-success' : '']"
            >{{ plannerStore.userMetrics.numberOfHosts }} / {{ level.minimumHosts }}</span
          >
        </li>
        <li class="list-group-item px-0">
          <span class="fw-bold"># of hummingbird attractors</span>
          <span
            class="text-end float-end"
            :class="[levelMetric?.hasNumberOfHummingbirdHabitats ? 'text-success' : '']"
            >{{ plannerStore.userMetrics.numberOfHummingbirdHabitats }} /
            {{ level.minimumHummingbirdHabitats }}</span
          >
        </li>
        <li class="list-group-item px-0">
          <span class="fw-bold"># of bird habitats</span>
          <span
            class="text-end float-end"
            :class="[levelMetric?.hasNumberOfOtherBirdHabitats ? 'text-success' : '']"
            >{{ plannerStore.userMetrics.numberOfOtherBirdHabitats }} /
            {{ level.minimumOtherBirdHabitats }}
          </span>
        </li>
        <li class="list-group-item px-0">
          <span class="fw-bold"># of continuous blooms per month</span>
          <span
            class="text-end float-end"
            :class="[levelMetric?.hasBloomsPerMonth ? 'text-success' : '']"
            >{{ plannerStore.userMetrics.minNumberOfBloomsPerMonth }} /
            {{ level.minimumContinuousBlooms }}</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>
