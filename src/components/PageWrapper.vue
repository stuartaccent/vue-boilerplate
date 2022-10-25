<script lang="ts">
import { defineComponent } from "vue";
import HeaderItem from "@/components/HeaderItem.vue";

export default defineComponent({
  components: {
    HeaderItem,
  },
  props: {
    title: String,
  },
});
</script>

<template>
  <HeaderItem />
  <div class="container mx-auto max-w-8xl px-3">
    <section>
      <h1 class="mb-6">{{ title }}</h1>
      <slot></slot>
    </section>
  </div>
</template>
