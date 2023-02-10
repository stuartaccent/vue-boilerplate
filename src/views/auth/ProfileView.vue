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
  <nav-bar />
  <header class="container mx-auto px-4 mb-10">
    <hgroup>
      <h1>Profile</h1>
      <h2>Update your details below.</h2>
    </hgroup>
  </header>
  <main class="container mx-auto px-4">
    <section>
      <div class="max-w-xl">
        <form-kit
          id="appform"
          v-model="data"
          :actions="false"
          :incomplete-message="false"
          type="form"
          form-class="space-y-6"
          @submit="submit"
        >
          <message-box v-if="success" type="message-success">
            Your profile was updated successfully.
          </message-box>
          <form-kit
            label="Email address"
            name="email"
            type="email"
            validation="required|email"
          />
          <form-kit
            label="First name"
            name="first_name"
            type="text"
            validation="required"
          />
          <form-kit
            label="Last name"
            name="last_name"
            type="text"
            validation="required"
          />
          <form-kit type="submit" label="Update" />
        </form-kit>
      </div>
    </section>
  </main>
</template>
