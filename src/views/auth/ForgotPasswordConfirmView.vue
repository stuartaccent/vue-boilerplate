<script lang="ts">
import { defineComponent } from "vue";
import { authService } from "@/services/auth";
import CenterFormWrapper from "@/components/CenterFormWrapper.vue";
import MessageBox from "@/components/MessageBox.vue";
import { prepareErrors } from "@/errorhandler";

export default defineComponent({
  components: {
    CenterFormWrapper,
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
  <CenterFormWrapper
    title="Forgotten Your Password"
    welcome="Request details to change your password."
  >
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
        label="Reset"
        input-class="button-primary w-full"
      />
    </FormKit>
    <MessageBox v-if="success" type="message-info">
      <p>
        Your password has been reset. You can now
        <RouterLink to="/login">Login</RouterLink>
        using your new password.
      </p>
    </MessageBox>
  </CenterFormWrapper>
</template>
