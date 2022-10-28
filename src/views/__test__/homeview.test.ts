import { beforeEach, describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";

function mountComponent() {
  return mount(HomeView, {
    global: {
      stubs: {
        PageWrapper: {
          template: "<slot></slot>",
          props: {
            title: String,
          },
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
