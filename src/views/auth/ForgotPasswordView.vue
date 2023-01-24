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
      <FormKit
        id="appform"
        :actions="false"
        type="form"
        messages-class="mb-4"
        @submit="submit"
      >
        <FormKit
          label="Email address"
          name="email"
          placeholder="johndoe@example.com"
          type="email"
          validation="required|email"
          outer-class="mb-6"
          input-class="w-full"
        />
        <FormKit
          type="submit"
          label="Request Details"
          input-class="button-primary"
        />
      </FormKit>
      <MessageBox v-if="success" type="message-info">
        <p>
          Assuming the email exists in our system. We will send details of what
          to do next.
        </p>
      </MessageBox>
    </section>
  </main>
  <FooterItem class="container mx-auto px-6" />
</template>

<style scoped>
main {
  min-height: calc(100vh - 3rem);
}
</style>
