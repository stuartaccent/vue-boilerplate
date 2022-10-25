import { createRouter, createWebHistory } from "vue-router";
import ForgotPasswordView from "@/views/auth/ForgotPasswordView.vue";
import ForgotPasswordConfirmView from "@/views/auth/ForgotPasswordConfirmView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import ProfileView from "@/views/auth/ProfileView.vue";
import auth from "@/services/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      component: LoginView,
      meta: { guest: true },
    },
    {
      path: "/forgotten-password",
      component: ForgotPasswordView,
      meta: { guest: true },
    },
    {
      path: "/forgotten-password/:token",
      component: ForgotPasswordConfirmView,
      meta: { guest: true },
    },
    {
      path: "/profile",
      component: ProfileView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to) => {
  if (!auth.authenticated && to.meta.requiresAuth) {
    return { path: "/login" };
  }
});

export default router;
