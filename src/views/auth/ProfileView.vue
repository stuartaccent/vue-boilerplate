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
      success: "",
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
    async submit(formName: string, formData: any) {
      this.success = "";
      try {
        await this.authService.update(formData);
        this.success = formName;
      } catch (e) {
        const prepare = prepareErrors(e);
        this.$formkit.setErrors(formName, prepare.errors, prepare.fieldErrors);
      }
    },
  },
});
</script>

<template>
  <nav-bar />
  <main class="container mx-auto px-4">
    <section class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-8 mb-10">
      <hgroup>
        <h3>Profile</h3>
        <h4>Update your profile.</h4>
      </hgroup>
      <div class="sm:col-span-2">
        <form-kit
          id="profile"
          v-model="data"
          :actions="false"
          :incomplete-message="false"
          type="form"
          form-class="space-y-6 max-w-xl"
          @submit="(formData) => submit('profile', formData)"
        >
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
          <message-box v-if="success == 'profile'" type="message-success">
            Your profile was updated successfully.
          </message-box>
          <form-kit type="submit" label="Update" input-class="sm:w-auto" />
        </form-kit>
      </div>
    </section>
    <section class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-8">
      <hgroup>
        <h3>Password</h3>
        <h4>Change your password.</h4>
      </hgroup>
      <div class="sm:col-span-2">
        <form-kit
          id="password"
          :actions="false"
          :incomplete-message="false"
          type="form"
          form-class="space-y-6 max-w-xl"
          @submit="(formData) => submit('password', formData)"
        >
          <form-kit
            label="New Password"
            name="password"
            type="password"
            validation="required"
          />
          <form-kit
            label="Confirm New Password"
            name="password_confirm"
            type="password"
            validation="required|confirm"
          />
          <message-box v-if="success == 'password'" type="message-success">
            Your password was updated successfully.
          </message-box>
          <form-kit
            type="submit"
            label="Change Password"
            input-class="sm:w-auto"
          />
        </form-kit>
      </div>
    </section>
  </main>
</template>
