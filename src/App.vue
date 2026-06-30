<script setup lang="ts">
import PlantList from './components/PlantList.vue'
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

    <PlantList />
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

<style scoped></style>
