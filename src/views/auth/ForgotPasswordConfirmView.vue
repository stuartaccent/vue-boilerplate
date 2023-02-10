<script lang="ts">
import { defineComponent } from "vue";
import { authService } from "@/services/auth";
import MessageBox from "@/components/MessageBox.vue";
import { prepareErrors } from "@/errorhandler";
import FooterItem from "@/components/FooterItem.vue";

export default defineComponent({
  components: {
    FooterItem,
    MessageBox,
  },
  data() {
    return {
      authService: authService,
      success: false,
    };
  },
  methods: {
    async submit(data: any) {
      const copied = {
        password: data.password as string,
        token: this.$route.params.token as string,
      };
      try {
        await this.authService.resetPassword(copied);
        this.$formkit.reset("appform");
        this.success = true;
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
      <h1>Change Your Password</h1>
      <h2>Set a new password for your account.</h2>
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
        <message-box v-if="success" type="message-info">
          Your password has been reset. You can now
          <router-link to="/login">Login</router-link>
          using your new password.
        </message-box>
        <form-kit
          label="New Password"
          name="password"
          placeholder="password"
          type="password"
          validation="required|length:6"
        />
        <form-kit
          label="Repeat Your Password"
          name="password_confirm"
          placeholder="password"
          type="password"
          validation="required|confirm"
        />
        <form-kit type="submit" label="Change Password" />
      </form-kit>
    </section>
  </main>
  <footer-item class="container mx-auto px-6" />
</template>

<style scoped>
main {
  min-height: calc(100vh - 3rem);
}
</style>
