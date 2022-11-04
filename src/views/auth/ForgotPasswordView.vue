<script lang="ts">
import { defineComponent } from "vue";
import { authService } from "@/services/auth";
import CenterFormWrapper from "@/components/CenterFormWrapper.vue";
import MessageBox from "@/components/MessageBox.vue";

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
        label="Reset"
        input-class="button-primary w-full"
      />
    </FormKit>
    <MessageBox type="info" v-if="success">
      <p>
        Assuming the email exists in our system. We will send details of what to
        do next.
      </p>
    </MessageBox>
  </CenterFormWrapper>
</template>
