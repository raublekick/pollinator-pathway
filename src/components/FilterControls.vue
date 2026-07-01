<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '../stores/filters'
import { months, formatMonth } from '../components/MonthComposable'

const filterStore = useFilterStore()
const showAdvancedFilters = ref(false)
</script>
<template>
  <div class="mb-3">
    <label for="search-input" class="visually-hidden">Search plants</label>
    <input
      id="search-input"
      v-model="filterStore.searchQuery"
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
              v-model="filterStore.filters.native"
            />
            <label class="form-check-label" for="checkNative"> Native</label>
          </div>

          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="checkBioreg"
              v-model="filterStore.filters.bioreg"
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
              v-model="filterStore.filters.commercial"
            />
            <label class="form-check-label" for="checkCommercial"> Commercially available</label>
          </div>

          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="checkNoncommercial"
              v-model="filterStore.filters.nonCommercial"
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
              v-model="filterStore.filters.hummingbirdAttractor"
            />
            <label class="form-check-label" for="checkHummingbirds">Attracts hummingbirds</label>
          </div>

          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="checkBirds"
              v-model="filterStore.filters.birdNestHabitat"
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
              v-model="filterStore.filters.specialValueNativeBees"
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
              v-model="filterStore.filters.extendedBloom"
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
              v-model="filterStore.filters.pollinator"
            />
            <label class="form-check-label" for="checkPollinator">Pollinator</label>
          </div>

          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="checkHost"
              v-model="filterStore.filters.hostPlant"
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
              v-model="filterStore.filters[month]"
            />
            <label class="form-check-label" :for="`check${month}`">{{ formatMonth(month) }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
