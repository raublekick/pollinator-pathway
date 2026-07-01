<script setup lang="ts">
import { ref } from 'vue'
import PlantList from './components/PlantList.vue'

const activeTab = ref(0)
const tabs = ref([
  { name: 'Plant List', component: PlantList },
  { name: 'Planner Progress', component: PlantList },
])
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
  </div>
  <footer class="footer bg-light">
    <div class="container py-3">
      <p>
        Favicon courtesy of
        <a href="https://pixelsafari.neocities.org/favicon/" target="_blank">Pixel Safari</a>
      </p>
      <p>No AI was harmed in the making of this website.</p>
    </div>
  </footer>
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
