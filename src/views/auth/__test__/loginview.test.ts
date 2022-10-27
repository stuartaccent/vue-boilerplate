import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { defaultConfig, plugin } from "@formkit/vue";
import LoginView from "@/views/auth/LoginView.vue";

declare module "vitest" {
  export interface TestContext {
    comp: any;
  }
}

const mockRouter = {
  push: vi.fn(),
};

describe("LoginView", () => {
  beforeEach((ctx) => {
    ctx.comp = mount(LoginView, {
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
          $router: mockRouter,
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
    expect(comp.get('input[name="username"]')).toBeDefined();
    expect(comp.get('input[name="password"]')).toBeDefined();
    expect(comp.get('button[type="submit"]')).toBeDefined();
  });

  it("submit success", async ({ comp }) => {
    await comp.vm.$nextTick();
    vi.spyOn(comp.vm.$data.authService, "login").mockResolvedValueOnce({});
    await comp.vm.submit({ username: "me@example.com", password: "pass" });
    await comp.vm.$nextTick();
    expect(mockRouter.push).toBeCalledWith("/");
  });

  it("submit failure", async ({ comp }) => {
    await comp.vm.$nextTick();
    vi.spyOn(comp.vm.$data.authService, "login").mockRejectedValueOnce({});
    const spy = vi.spyOn(comp.vm.$formkit, "setErrors");
    await comp.vm.submit({});
    await comp.vm.$nextTick();
    expect(spy).toBeCalledWith("appform", ["Something went wrong."], {});
  });
});
