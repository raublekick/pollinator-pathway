<script setup lang="ts">
import { computed } from 'vue'
import type { Plant } from '../types/plant'
import { months, formatMonth } from '../components/MonthComposable'
import { usePlannerStore } from '../stores/planner'

const plannerStore = usePlannerStore()

const props = defineProps<{
  item: Plant
}>()

const isSelected = computed<boolean>(() => {
  return plannerStore.selectedPlants.some((p) => {
    return plannerStore.matchPlants(p, props.item)
  })
})

const contiguousBloomMonths = computed<string[]>(() => {
  const blooms: string[] = []
  let startIndex: number | null = null

  months.forEach((month, index) => {
    const inBloom = Boolean(props.item[month])
    const isLastMonth = index === months.length - 1

    // new contiguous block starts
    if (inBloom && startIndex === null) {
      startIndex = index
    }
    // we've reached the end of a contiguous block, set the string to the start month and previous month
    if (startIndex !== null && (!inBloom || isLastMonth)) {
      const endIndex = inBloom && isLastMonth ? index : index - 1
      const start = formatMonth(months[startIndex] ?? month)
      const end = formatMonth(months[endIndex] ?? month)

      blooms.push(start === end ? start : `${start} - ${end}`)
      startIndex = null
    }
  })

  return blooms
})

const nativity = computed<string>(() => {
  switch (props.item.nativity) {
    case 'N':
      return 'Native to Maricopa County'
    case 'BIOREG':
      return 'Regionally native'
    default:
      return ''
  }
})

const commercialAvailablility = computed<string>(() => {
  switch (props.item.availability) {
    case 'C':
      return 'Generally commercially available'
    case 'NC':
      return 'Not generally in local nurseries'
    default:
      return ''
  }
})
</script>

<template>
  <div class="card position-relative plant-card">
    <div class="card-header">
      {{ item.commonName }} <span v-if="item.scientificName">({{ item.scientificName }})</span>
      <div class="float-end">{{ item.type }}</div>
    </div>
    <div class="card-body ps-5 pe-4">
      <div class="row">
        <div class="col-sm col-lg-9">
          <p v-if="item.notes" class="card-text">{{ item.notes }}</p>

          <div v-if="contiguousBloomMonths.length" class="mb-3">
            <div class="fw-bold">Bloom months:</div>
            <!-- Show for larger screens -->
            <div class="d-none d-xl-block">
              <div class="row text-small">
                <div class="col-1" :class="item.january ? 'bg-success text-white' : 'fw-lighter'">
                  Jan
                </div>
                <div class="col-1" :class="item.february ? 'bg-success text-white' : 'fw-lighter'">
                  Feb
                </div>
                <div class="col-1" :class="item.march ? 'bg-success text-white' : 'fw-lighter'">
                  Mar
                </div>
                <div class="col-1" :class="item.april ? 'bg-success text-white' : 'fw-lighter'">
                  Apr
                </div>
                <div class="col-1" :class="item.may ? 'bg-success text-white' : 'fw-lighter'">
                  May
                </div>
                <div class="col-1" :class="item.june ? 'bg-success text-white' : 'fw-lighter'">
                  Jun
                </div>
                <div class="col-1" :class="item.july ? 'bg-success text-white' : 'fw-lighter'">
                  Jul
                </div>
                <div class="col-1" :class="item.august ? 'bg-success text-white' : 'fw-lighter'">
                  Aug
                </div>
                <div class="col-1" :class="item.september ? 'bg-success text-white' : 'fw-lighter'">
                  Sep
                </div>
                <div class="col-1" :class="item.october ? 'bg-success text-white' : 'fw-lighter'">
                  Oct
                </div>
                <div class="col-1" :class="item.november ? 'bg-success text-white' : 'fw-lighter'">
                  Nov
                </div>
                <div class="col-1" :class="item.december ? 'bg-success text-white' : 'fw-lighter'">
                  Dec
                </div>
              </div>
            </div>
            <!-- Show for smaller screens -->
            <div class="d-xl-none">
              <div
                v-for="(group, index) in contiguousBloomMonths"
                :key="index"
                class="bg-success text-white"
              >
                {{ group }}
              </div>
            </div>
          </div>

          <div v-if="item.hostFor">
            <div class="fw-bold">Host for:</div>
            <div v-if="item.hostFor" class="card-text">{{ item.hostFor }}</div>
          </div>
        </div>
        <div class="col-sm text-end">
          <small v-if="item.pollinator" class="text-muted d-block">Pollinator</small>
          <small v-if="item.hostPlant" class="text-muted d-block"> Host plant </small>
          <small v-if="item.containerFriendly" class="text-muted d-block">Container friendly</small>
          <small v-if="item.hummingbirdAttractor" class="text-muted d-block"
            >Attracts hummingbirds</small
          >
          <small v-if="item.birdNestHabitat" class="text-muted d-block">Bird nest habitat</small>
          <small v-if="item.specialValueNativeBees" class="text-muted d-block"
            >Special value to native bees</small
          >
          <small v-if="item.extendedBloom" class="text-muted d-block"
            >May have extended bloom periods</small
          >
          <small v-if="item.maricopaNativeSeedLibrary" class="text-muted d-block"
            >Available at Maricopa Seed Library</small
          >
          <small class="text-muted d-block">
            {{ nativity }}
          </small>

          <small class="text-muted d-block">
            {{ commercialAvailablility }}
          </small>
        </div>
      </div>
      <button
        v-if="!isSelected"
        class="btn btn-sm btn-outline-success float-end my-3 planner-control"
        @click="plannerStore.addPlant(item)"
      >
        Add to planner
      </button>
      <button
        v-if="isSelected"
        class="btn btn-sm btn-outline-danger float-end my-3 planner-control"
        @click="plannerStore.removePlant(item)"
      >
        Remove from planner
      </button>
    </div>
  </div>
</template>

<style lang="css">
/* .bloom-months {
  font-size: clamp(0.75rem, 1vw, 1rem);
} */
/* .planner-control {
  visibility: hidden;
}
.plant-card:hover .planner-control {
  visibility: visible;
} */
</style>
