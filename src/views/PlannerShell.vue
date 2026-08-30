<script lang="ts" setup>
import { ref, markRaw } from 'vue'
import PlantList from '@/components/PlantList.vue'
import PlannerList from '@/components/PlannerList.vue'
import FilterControls from '@/components/FilterControls.vue'
const activeTab = ref(0)
const tabs = ref([
  { name: 'Plant List', component: markRaw(PlantList) },
  { name: 'Planner Progress', component: markRaw(PlannerList) },
])
</script>
<template>
  <FilterControls />
  <nav>
    <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist" data-scroll-position="0">
      <template v-for="(tab, index) in tabs" :key="index">
        <a
          :class="['nav-item', 'nav-link', activeTab === index ? 'active' : '']"
          :id="'nav-step' + index + '-tab'"
          data-bs-toggle="tab"
          :href="'#nav-step' + index"
          role="tab"
          :aria-controls="'nav-step' + index"
          aria-selected="true"
          :aria-current="index === activeTab"
          @click="activeTab = index"
        >
          {{ tab.name }}
        </a>
      </template>
    </div>
  </nav>
  <div class="tab-content py-3" id="nav-tabContent">
    <template v-for="(tab, index) in tabs" :key="index">
      <div
        :class="['tab-pane', 'fade', activeTab === index ? ['active', 'show'] : '']"
        :id="'nav-step' + index"
        role="tabpanel"
        :aria-labelledby="'nav-step' + index + '-tab'"
      >
        <component :is="tab.component"></component>
      </div>
    </template>
  </div>
</template>
<style scoped>
.nav-tabs .nav-link {
  color: #000;
  padding: 0.2em 0.8em;
  border-right: 0;
  border-left: 0;
  border-top: 0;
  text-decoration: none;
  /* font-weight: bold;
  font-size: 24px; */

  border: 1px solid var(--bs-nav-tabs-border-color);
  border-bottom: 3px solid var(--bs-nav-tabs-border-color);
  background-color: var(--bs-light-rgb);
  color: var(--bs-secondary-color);
  border-radius: 0;
}
.nav-tabs .nav-link.active {
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid var(--bs-success);
  border-bottom: 3px solid var(--bs-success);
  color: var(--bs-success-text-emphasis);
  border-radius: 0;
}
</style>
