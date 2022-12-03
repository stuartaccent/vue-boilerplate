<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    welcome: String,
  },
});
</script>

<template>
  <section class="flex h-screen w-full">
    <div class="w-[450px] m-auto px-4 md:px-0">
      <h1 class="text-center text-3xl font-bold">{{ title }}</h1>
      <p class="text-center text-slate-500 mb-4">{{ welcome }}</p>
      <slot></slot>
    </div>
  </section>
</template>
