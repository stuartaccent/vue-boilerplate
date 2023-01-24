import { beforeEach, describe, expect, it, vi } from "vitest";
import { reactive } from "vue";
import { mount } from "@vue/test-utils";
import { defaultConfig, plugin } from "@formkit/vue";
import { AuthService } from "@/services/auth";
import ProfileView from "@/views/auth/ProfileView.vue";

class MockAuthService extends AuthService {
  state = reactive({
    user: {
      id: null,
      email: "me@example.com",
      first_name: "Some",
      last_name: "One",
      is_active: false,
      is_superuser: false,
      is_verified: false,
    },
  });

  async me(): Promise<void> {
    await Promise.resolve();
  }
}

function mountComponent() {
  return mount(ProfileView, {
    global: {
      stubs: {
        NavBar: {
          template: "<nav></nav>",
        },
      },
      plugins: [[plugin, defaultConfig]],
    },
    data() {
      return {
        authService: new MockAuthService(),
        success: false,
        data: {},
      };
    },
  });
}

let comp: ReturnType<typeof mountComponent>;

describe("ProfileView", () => {
  beforeEach(() => {
    comp = mountComponent();
  });

  it("renders properly", () => {
    expect(comp).toBeDefined();
  });

  it("contains a form", async () => {
    await comp.vm.$nextTick();
    expect(comp.get('input[name="email"]')).toBeDefined();
    expect(comp.get('input[name="first_name"]')).toBeDefined();
    expect(comp.get('input[name="last_name"]')).toBeDefined();
    expect(comp.get('button[type="submit"]')).toBeDefined();
  });

  it("data is set when created", async () => {
    await comp.vm.$nextTick();
    expect(comp.vm.$data.data).toEqual({
      email: "me@example.com",
      first_name: "Some",
      last_name: "One",
    });
  });

  it("success message when true", async () => {
    const msg = "Your profile was updated successfully.";
    expect(comp.html()).not.toContain(msg);
    comp.vm.$data.success = true;
    await comp.vm.$nextTick();
    expect(comp.html()).toContain(msg);
  });

  it("submit success", async () => {
    await comp.vm.$nextTick();
    const spy = vi
      .spyOn(comp.vm.$data.authService, "update")
      .mockResolvedValueOnce();
    const data = comp.vm.$data.data;
    await comp.vm.submit(data);
    await comp.vm.$nextTick();
    expect(spy).toBeCalledWith(data);
    expect(comp.vm.$data.success).toEqual(true);
  });

  it("submit failure", async () => {
    await comp.vm.$nextTick();
    vi.spyOn(comp.vm.$data.authService, "update").mockRejectedValueOnce({});
    const spy = vi.spyOn(comp.vm.$formkit, "setErrors");
    await comp.vm.submit({});
    await comp.vm.$nextTick();
    expect(spy).toBeCalledWith("appform", ["Something went wrong."], {});
  });
});
