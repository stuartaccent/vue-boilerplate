import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PageWrapper from "@/components/PageWrapper.vue";

describe("PageWrapper", () => {
  it("renders properly", () => {
    const wrapper = mount(PageWrapper, {
      props: { title: "Hello" },
      slots: { default: "<div>Main Content</div>" },
      shallow: true,
    });
    expect(wrapper.html()).toContain("Hello");
    expect(wrapper.html()).toContain("<div>Main Content</div>");
  });
});
