<script lang="ts">
import { defineComponent } from "vue";
import { authService } from "@/services/auth";

export default defineComponent({
  data() {
    return {
      authService: authService,
    };
  },
  methods: {
    async logout() {
      await this.authService.logout();
    },
  },
});
</script>

<template>
  <nav class="flex mb-6">
    <ul class="flex mr-auto">
      <li class="px-4 py-2"><RouterLink to="/">Home</RouterLink></li>
    </ul>
    <ul class="flex">
      <li class="px-4 py-2">
        <RouterLink class="ml-auto" to="/profile">Profile</RouterLink>
      </li>
      <li class="px-4 py-2"><a @click="logout()">Logout</a></li>
    </ul>
  </nav>
</template>
