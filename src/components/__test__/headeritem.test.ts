import { describe, it, expect } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import HeaderItem from "@/components/HeaderItem.vue";

describe("HeaderItem", () => {
  it("renders properly", () => {
    const header = mount(HeaderItem, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
    expect(header).toBeDefined();
  });
});
