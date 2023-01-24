<script lang="ts">
import { defineComponent } from "vue";
import { authService } from "@/services/auth";
import { prepareErrors } from "@/errorhandler";
import MessageBox from "@/components/MessageBox.vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  components: {
    MessageBox,
    NavBar,
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
    const user = this.authService.state.user;
    this.data = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
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
  <NavBar />
  <header class="container mx-auto px-4 mb-10">
    <hgroup>
      <h1>Profile</h1>
      <h2>Update your details below.</h2>
    </hgroup>
  </header>
  <main class="container mx-auto px-4">
    <section>
      <div class="max-w-xl">
        <MessageBox v-if="success" class="mb-6" type="message-success">
          <p class="font-bold">Success</p>
          <p>Your profile was updated successfully.</p>
        </MessageBox>
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
    </section>
  </main>
</template>
