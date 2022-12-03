import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import MessageBox from "@/components/MessageBox.vue";

describe("MessageBox", () => {
  it("success", () => {
    const message = mount(MessageBox, {
      slots: { default: "Some message" },
      attrs: { type: "message-success" },
    });
    expect(message.html()).toContain("Some message");
    expect(message.html()).toContain("message message-success");
  });

  it("info", () => {
    const message = mount(MessageBox, {
      slots: { default: "Some message" },
      attrs: { type: "message-info" },
    });
    expect(message.html()).toContain("Some message");
    expect(message.html()).toContain("message message-info");
  });

  it("warning", () => {
    const message = mount(MessageBox, {
      slots: { default: "Some message" },
      attrs: { type: "message-warning" },
    });
    expect(message.html()).toContain("Some message");
    expect(message.html()).toContain("message message-warning");
  });

  it("error", () => {
    const message = mount(MessageBox, {
      slots: { default: "Some message" },
      attrs: { type: "message-error" },
    });
    expect(message.html()).toContain("Some message");
    expect(message.html()).toContain("message message-error");
  });
});
