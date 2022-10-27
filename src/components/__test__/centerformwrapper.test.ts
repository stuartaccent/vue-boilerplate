import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import CenterFormWrapper from "@/components/CenterFormWrapper.vue";

describe("CenterFormWrapper", () => {
  it("renders properly", () => {
    const wrapper = mount(CenterFormWrapper, {
      props: { title: "Hello", welcome: "Welcome" },
      slots: { default: "Main Content" },
    });
    expect(wrapper.html()).toContain("Hello");
    expect(wrapper.html()).toContain("Welcome");
    expect(wrapper.html()).toContain("Main Content");
  });
});
