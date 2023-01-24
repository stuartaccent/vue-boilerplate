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
      <FormKit
        id="appform"
        :actions="false"
        type="form"
        messages-class="mb-4"
        @submit="submit"
      >
        <FormKit
          label="Email address"
          name="username"
          placeholder="johndoe@example.com"
          type="email"
          validation="required|email"
          outer-class="mb-6"
          input-class="w-full"
        />
        <FormKit
          label="Password"
          name="password"
          placeholder="password"
          type="password"
          validation="required"
          outer-class="mb-6"
          input-class="w-full"
        />
        <div class="flex mb-6">
          <RouterLink class="ml-auto text-sm" to="/forgotten-password">
            Forgotten your password?
          </RouterLink>
        </div>
        <FormKit type="submit" label="Login" input-class="button-primary" />
      </FormKit>
    </section>
  </main>
  <FooterItem class="container mx-auto px-6" />
</template>

<style scoped>
main {
  min-height: calc(100vh - 3rem);
}
</style>
