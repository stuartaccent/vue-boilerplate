import { beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { defaultConfig, plugin } from "@formkit/vue";
import ForgotPasswordView from "@/views/auth/ForgotPasswordView.vue";

function mountComponent() {
  return mount(ForgotPasswordView, {
    global: {
      stubs: {
        FooterItem: {
          template: "<footer></footer>",
        },
      },
      plugins: [[plugin, defaultConfig]],
    },
  });
}

let comp: ReturnType<typeof mountComponent>;

describe("ForgotPasswordView", () => {
  beforeEach(() => {
    comp = mountComponent();
  });

  it("renders properly", () => {
    expect(comp).toBeDefined();
  });

  it("contains a form", async () => {
    await comp.vm.$nextTick();
    expect(comp.get('input[name="email"]')).toBeDefined();
    expect(comp.get('button[type="submit"]')).toBeDefined();
  });

  it("success message when true", async () => {
    const msg = "We will send details of what to do next.";
    expect(comp.html()).not.toContain(msg);
    comp.vm.$data.success = true;
    await comp.vm.$nextTick();
    expect(comp.html()).toContain(msg);
  });

  it("submit success", async () => {
    await comp.vm.$nextTick();
    vi.spyOn(
      comp.vm.$data.authService,
      "forgotPassword"
    ).mockResolvedValueOnce();
    await comp.vm.submit({ email: "me@example.com" });
    await comp.vm.$nextTick();
    expect(comp.vm.$data.success).toEqual(true);
  });

  it("submit failure acts like success", async () => {
    await comp.vm.$nextTick();
    vi.spyOn(comp.vm.$data.authService, "forgotPassword").mockRejectedValueOnce(
      {}
    );
    await comp.vm.submit({ email: "me@example.com" });
    await comp.vm.$nextTick();
    expect(comp.vm.$data.success).toEqual(true);
  });
});
