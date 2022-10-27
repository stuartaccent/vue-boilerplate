import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MessageSuccess from "@/components/MessageSuccess.vue";

describe("MessageSuccess", () => {
  it("renders properly", () => {
    const message = mount(MessageSuccess, {
      slots: { default: "Some message" },
    });
    expect(message.html()).toContain("Some message");
  });
});
