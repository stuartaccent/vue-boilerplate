<script lang="ts">
import { defineComponent } from "vue";
import PageWrapper from "@/components/PageWrapper.vue";

export default defineComponent({
  components: {
    PageWrapper,
  },
});
</script>

<template>
  <PageWrapper title="Home">
    <p>Lorem ipsum...</p>
  </PageWrapper>
</template>
