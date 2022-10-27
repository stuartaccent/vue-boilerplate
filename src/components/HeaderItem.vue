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
  <header class="flex py-3 px-4 mb-6">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink class="ml-auto" to="/profile">Profile</RouterLink>
    <a class="ml-4" @click="logout()">Logout</a>
  </header>
</template>
