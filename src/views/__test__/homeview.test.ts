import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";

describe("HomeView", () => {
  it("renders properly", () => {
    const wrapper = mount(HomeView, {
      shallow: true,
    });
    expect(wrapper.html()).toContain("Home");
  });
});