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
    <div class="w-[450px] m-auto">
      <h1 class="text-center text-3xl font-bold">{{ title }}</h1>
      <p class="text-center text-slate-500 mb-4">{{ welcome }}</p>
      <div class="bg-white shadow-lg px-14 py-10">
        <slot></slot>
      </div>
    </div>
  </section>
</template>
