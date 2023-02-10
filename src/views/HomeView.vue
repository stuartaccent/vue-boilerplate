<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  components: { NavBar },
});
</script>

<template>
  <nav-bar />
  <header class="container mx-auto px-4 mb-10">
    <hgroup>
      <h1>Homepage</h1>
      <h2>Example homepage layout.</h2>
    </hgroup>
  </header>
  <main class="container mx-auto px-4">
    <article>
      <h2>Article</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </article>
  </main>
</template>
