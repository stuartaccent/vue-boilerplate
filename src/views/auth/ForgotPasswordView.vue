<script lang="ts">
import { defineComponent } from "vue";
import { authService } from "@/services/auth";
import CenterFormWrapper from "@/components/CenterFormWrapper.vue";
import MessageInfo from "@/components/MessageInfo.vue";

export default defineComponent({
  components: {
    CenterFormWrapper,
    MessageInfo,
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
    <MessageInfo v-if="success">
      <p>
        Assuming the email exists in our system. We will send details of what to
        do next.
      </p>
    </MessageInfo>
  </CenterFormWrapper>
</template>
