<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    type: String,
  },
});
</script>

<template>
  <div :class="'message message-' + type">
    <slot></slot>
  </div>
</template>
