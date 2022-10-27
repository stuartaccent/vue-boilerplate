<script lang="ts">
import { defineComponent } from "vue";
import { authService } from "@/services/auth";
import CenterFormWrapper from "@/components/CenterFormWrapper.vue";
import { prepareErrors } from "@/errorhandler";

export default defineComponent({
  components: {
    CenterFormWrapper,
  },
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
  <CenterFormWrapper title="Login" welcome="Access your account">
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
      <FormKit
        type="submit"
        label="Login"
        input-class="button-primary w-full"
      />
    </FormKit>
  </CenterFormWrapper>
</template>
