<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";

type messageType =
  | "message-info"
  | "message-error"
  | "message-success"
  | "message-warning";

export default defineComponent({
  props: {
    type: String as PropType<messageType>,
  },
});
</script>

<template>
  <div :class="'message ' + type">
    <slot></slot>
  </div>
</template>
