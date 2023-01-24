import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import FooterItem from "@/components/FooterItem.vue";

describe("FooterItem", () => {
  it("renders properly", () => {
    const footer = mount(FooterItem, {});
    expect(footer).toBeDefined();
  });
});
