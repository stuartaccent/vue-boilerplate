<script lang="ts">
import { defineComponent } from "vue";
import { authService } from "@/services/auth";
import { prepareErrors } from "@/errorhandler";
import FooterItem from "@/components/FooterItem.vue";

export default defineComponent({
  components: { FooterItem },
  data() {
    return {
      authService: authService,
    };
  },
  methods: {
    async submit(data: any) {
      try {
        await this.authService.login(data);
        this.$router.push("/");
      } catch (e) {
        const prepare = prepareErrors(e);
        this.$formkit.setErrors("appform", prepare.errors, prepare.fieldErrors);
      }
    },
  },
});
</script>

<template>
  <main class="container mx-auto px-6 flex flex-col justify-center">
    <hgroup class="mb-10">
      <h1>Login</h1>
      <h2>Access your account.</h2>
    </hgroup>
    <section class="max-w-[500px]">
      <form-kit
        id="appform"
        :actions="false"
        :incomplete-message="false"
        type="form"
        form-class="space-y-6"
        @submit="submit"
      >
        <form-kit
          label="Email address"
          name="username"
          placeholder="johndoe@example.com"
          type="email"
          validation="required|email"
        />
        <form-kit
          label="Password"
          name="password"
          placeholder="password"
          type="password"
          validation="required"
        />
        <div class="text-right">
          <router-link to="/forgotten-password">
            Forgotten your password?
          </router-link>
        </div>
        <form-kit type="submit" label="Login" />
      </form-kit>
    </section>
  </main>
  <footer-item class="container mx-auto px-6 py-3" />
</template>

<style>
body > div {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
body > div > main {
  flex-grow: 1;
}
</style>
