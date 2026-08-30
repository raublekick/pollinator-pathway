<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <main class="app-main">
      <div class="container">
        <h1>Maricopa County Pollinator Pathway Planner</h1>
        <p>
          This website is to assist in planning a pollinator garden using the
          <a href="https://libguides.maricopa.edu/seed/pathway" target="_blank"
            >Maricopa Pollinator Pathway</a
          >
          certification. For more information about the Maricopa Pollinator Pathway program and the
          certification rules, please visit:
          <a href="https://libguides.maricopa.edu/seed/pathway" target="_blank"
            >https://libguides.maricopa.edu/seed/pathway</a
          >.
        </p>

        <RouterView />
      </div>
    </main>
    <footer class="footer bg-light">
      <div class="container py-3">
        <div class="row">
          <div class="col">
            <p>
              Source code available on
              <a href="https://github.com/raublekick/pollinator-pathway">GitHub</a>
            </p>
            <p>
              Favicon courtesy of
              <a href="https://pixelsafari.neocities.org/favicon/" target="_blank">Pixel Safari</a>
            </p>
          </div>
          <div class="col text-end">
            <p>
              This work is licensed under
              <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a
              ><img
                src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
                alt=""
                style="max-width: 1em; max-height: 1em; margin-left: 0.2em"
              /><img
                src="https://mirrors.creativecommons.org/presskit/icons/by.svg"
                alt=""
                style="max-width: 1em; max-height: 1em; margin-left: 0.2em"
              /><img
                src="https://mirrors.creativecommons.org/presskit/icons/sa.svg"
                alt=""
                style="max-width: 1em; max-height: 1em; margin-left: 0.2em"
              />
            </p>
            <p>No AI was harmed in the making of this website.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
}

.footer {
  flex-shrink: 0;
}
</style>
