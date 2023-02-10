<script lang="ts">
import { defineComponent } from "vue";
import { authService } from "@/services/auth";
import MessageBox from "@/components/MessageBox.vue";
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
      try {
        await this.authService.forgotPassword(data.email);
        this.$formkit.reset("appform");
        this.success = true;
      } catch (e) {
        this.success = true;
      }
    },
  },
});
</script>

<template>
  <main class="container mx-auto px-6 flex flex-col justify-center">
    <hgroup class="mb-10">
      <h1>Forgotten Your Password</h1>
      <h2>Request details to change your password.</h2>
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
          Assuming the email exists in our system. We will send details of what
          to do next.
        </message-box>
        <form-kit
          label="Email address"
          name="email"
          placeholder="johndoe@example.com"
          type="email"
          validation="required|email"
        />
        <form-kit type="submit" label="Request Details" />
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
