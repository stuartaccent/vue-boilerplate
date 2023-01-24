import { beforeEach, describe, expect, it, vi } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { defaultConfig, plugin } from "@formkit/vue";
import LoginView from "@/views/auth/LoginView.vue";

const mockRouter = {
  push: vi.fn(),
};

function mountComponent() {
  return mount(LoginView, {
    global: {
      stubs: {
        FooterItem: {
          template: "<footer></footer>",
        },
        RouterLink: RouterLinkStub,
      },
      mocks: {
        $router: mockRouter,
      },
      plugins: [[plugin, defaultConfig]],
    },
  });
}

let comp: ReturnType<typeof mountComponent>;

describe("LoginView", () => {
  beforeEach(() => {
    comp = mountComponent();
  });

  it("renders properly", () => {
    expect(comp).toBeDefined();
  });

  it("contains a form", async () => {
    await comp.vm.$nextTick();
    expect(comp.get('input[name="username"]')).toBeDefined();
    expect(comp.get('input[name="password"]')).toBeDefined();
    expect(comp.get('button[type="submit"]')).toBeDefined();
  });

  it("submit success", async () => {
    await comp.vm.$nextTick();
    vi.spyOn(comp.vm.$data.authService, "login").mockResolvedValueOnce();
    await comp.vm.submit({ username: "me@example.com", password: "pass" });
    await comp.vm.$nextTick();
    expect(mockRouter.push).toBeCalledWith("/");
  });

  it("submit failure", async () => {
    await comp.vm.$nextTick();
    vi.spyOn(comp.vm.$data.authService, "login").mockRejectedValueOnce({});
    const spy = vi.spyOn(comp.vm.$formkit, "setErrors");
    await comp.vm.submit({});
    await comp.vm.$nextTick();
    expect(spy).toBeCalledWith("appform", ["Something went wrong."], {});
  });
});
