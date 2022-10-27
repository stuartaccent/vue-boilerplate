import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MessageInfo from "@/components/MessageInfo.vue";

describe("MessageInfo", () => {
  it("renders properly", () => {
    const message = mount(MessageInfo, {
      slots: { default: "Some message" },
    });
    expect(message.html()).toContain("Some message");
  });
});
