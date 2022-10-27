import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { defaultConfig, plugin } from "@formkit/vue";
import ForgotPasswordConfirmView from "@/views/auth/ForgotPasswordConfirmView.vue";

declare module "vitest" {
  export interface TestContext {
    comp: any;
  }
}

const mockRoute = {
  params: {
    token: "token",
  },
};

describe("ForgotPasswordConfirmView", () => {
  beforeEach((ctx) => {
    ctx.comp = mount(ForgotPasswordConfirmView, {
      global: {
        stubs: {
          CenterFormWrapper: {
            template: "<slot></slot>",
            props: {
              title: String,
              welcome: String,
            },
          },
          RouterLink: RouterLinkStub,
        },
        mocks: {
          $route: mockRoute,
        },
        plugins: [[plugin, defaultConfig]],
      },
    });
  });

  it("renders properly", ({ comp }) => {
    expect(comp).toBeDefined();
  });

  it("contains a form", async ({ comp }) => {
    await comp.vm.$nextTick();
    expect(comp.get('input[name="password"]')).toBeDefined();
    expect(comp.get('input[name="password_confirm"]')).toBeDefined();
    expect(comp.get('button[type="submit"]')).toBeDefined();
  });

  it("success message when true", async ({ comp }) => {
    const msg = "Your password has been reset.";
    expect(comp.html()).not.toContain(msg);
    comp.vm.$data.success = true;
    await comp.vm.$nextTick();
    expect(comp.html()).toContain(msg);
  });

  it("submit success", async ({ comp }) => {
    await comp.vm.$nextTick();
    vi.spyOn(comp.vm.$data.authService, "resetPassword").mockResolvedValueOnce(
      {}
    );
    await comp.vm.submit({ password: "pw", password_confirm: "pw" });
    await comp.vm.$nextTick();
    expect(comp.vm.$data.success).toEqual(true);
  });

  it("submit failure", async ({ comp }) => {
    await comp.vm.$nextTick();
    vi.spyOn(comp.vm.$data.authService, "resetPassword").mockRejectedValueOnce(
      {}
    );
    const spy = vi.spyOn(comp.vm.$formkit, "setErrors");
    await comp.vm.submit({ password: "pw", password_confirm: "pw" });
    await comp.vm.$nextTick();
    expect(spy).toBeCalledWith("appform", ["Something went wrong."], {});
  });
});
