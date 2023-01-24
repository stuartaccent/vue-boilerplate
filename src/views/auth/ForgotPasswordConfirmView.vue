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
      <FormKit
        id="appform"
        :actions="false"
        type="form"
        messages-class="mb-4"
        @submit="submit"
      >
        <FormKit
          label="New Password"
          name="password"
          placeholder="password"
          type="password"
          validation="required|length:6"
          outer-class="mb-6"
          input-class="w-full"
        />
        <FormKit
          label="Repeat Your Password"
          name="password_confirm"
          placeholder="password"
          type="password"
          validation="required|confirm"
          outer-class="mb-6"
          input-class="w-full"
        />
        <FormKit
          type="submit"
          label="Change Password"
          input-class="button-primary"
        />
      </FormKit>
      <MessageBox v-if="success" type="message-info">
        <p>
          Your password has been reset. You can now
          <RouterLink to="/login">Login</RouterLink>
          using your new password.
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
