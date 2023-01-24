import { beforeEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";

function mountComponent() {
  return mount(HomeView, {
    global: {
      stubs: {
        NavBar: {
          template: "<nav></nav>",
        },
      },
    },
  });
}

let comp: ReturnType<typeof mountComponent>;

describe("HomeView", () => {
  beforeEach(() => {
    comp = mountComponent();
  });

  it("renders properly", () => {
    expect(comp).toBeDefined();
  });
});
