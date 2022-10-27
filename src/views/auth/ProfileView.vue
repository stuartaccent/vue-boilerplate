<script lang="ts">
import { defineComponent } from "vue";
import { authService } from "@/services/auth";
import PageWrapper from "@/components/PageWrapper.vue";
import { prepareErrors } from "@/errorhandler";
import MessageSuccess from "@/components/MessageSuccess.vue";

export default defineComponent({
  components: {
    MessageSuccess,
    PageWrapper,
  },
  data() {
    return {
      authService: authService,
      data: {},
      success: false,
    };
  },
  async created() {
    await this.authService.me();
    this.data = {
      email: this.authService.user.email,
      first_name: this.authService.user.first_name,
      last_name: this.authService.user.last_name,
    };
  },
  methods: {
    async submit(data: any) {
      this.success = false;
      try {
        await this.authService.update(data);
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
  <PageWrapper title="Profile">
    <div class="max-w-xl">
      <MessageSuccess v-if="success" class="mb-6">
        <p class="font-bold">Success</p>
        <p>Your profile was updated successfully.</p>
      </MessageSuccess>
      <FormKit
        id="appform"
        v-model="data"
        :actions="false"
        type="form"
        @submit="submit"
        messages-class="mb-4"
      >
        <FormKit
          label="Email address"
          name="email"
          type="email"
          validation="required|email"
          outer-class="mb-6"
          input-class="w-full"
        />
        <FormKit
          label="First name"
          name="first_name"
          type="text"
          validation="required"
          outer-class="mb-6"
          input-class="w-full"
        />
        <FormKit
          label="Last name"
          name="last_name"
          type="text"
          validation="required"
          outer-class="mb-6"
          input-class="w-full"
        />
        <FormKit type="submit" label="Update" input-class="button-primary" />
      </FormKit>
    </div>
  </PageWrapper>
</template>
