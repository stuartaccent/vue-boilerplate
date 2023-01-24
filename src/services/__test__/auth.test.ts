import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { authService } from "@/services/auth";
import axios from "axios";

describe("authService", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "getItem");
    vi.spyOn(Storage.prototype, "setItem");
    vi.spyOn(Storage.prototype, "clear");
    vi.mock("axios");
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  describe("accessToken", () => {
    it("accessToken should get from localStorage", () => {
      const expiry = new Date();
      expiry.setSeconds(expiry.getSeconds() + 3600);
      const data = { access_token: "token", expiry: expiry };
      const token = JSON.stringify(data);
      (Storage.prototype.getItem as Mock).mockReturnValue(token);
      expect(authService.accessToken).toEqual("token");
    });
  });

  describe("authenticated", () => {
    it("should be true when access token exists", () => {
      const expiry = new Date();
      expiry.setSeconds(expiry.getSeconds() + 3600);
      const data = { access_token: "token", expiry: expiry };
      const token = JSON.stringify(data);
      (Storage.prototype.getItem as Mock).mockReturnValue(token);
      expect(authService.authenticated).toEqual(true);
    });

    it("should be false when no access token exists", () => {
      (Storage.prototype.getItem as Mock).mockReturnValue(null);
      expect(authService.authenticated).toEqual(false);
    });
  });

  describe("forgotPassword", () => {
    it("should post correctly", async () => {
      (axios.post as Mock).mockResolvedValueOnce({ data: {} });
      await authService.forgotPassword("me@test.com");
      expect(axios.post).toBeCalledWith("auth/forgot-password", {
        email: "me@test.com",
      });
    });
  });

  describe("me", () => {
    it("should get correctly", async () => {
      (axios.get as Mock).mockResolvedValueOnce({ data: {} });
      await authService.me();
      expect(axios.get).toBeCalledWith("users/me");
    });

    it("should set user state", async () => {
      const data = {
        id: "id",
        email: "me@example.com",
        first_name: "Some",
        last_name: "One",
        is_active: true,
        is_superuser: false,
        is_verified: false,
      };
      (axios.get as Mock).mockResolvedValueOnce({ data: data });
      await authService.me();
      expect(authService.state.user).toEqual(data);
    });
  });

  describe("login", () => {
    it("should set access_token", async () => {
      const me = {
        id: "id-123",
        email: "me@example.com",
        first_name: "Some",
        last_name: "One",
        is_active: true,
        is_superuser: false,
        is_verified: false,
      };
      (axios.get as Mock).mockResolvedValueOnce({ data: me });

      const token = {
        access_token: "token",
        token_type: "bearer",
        expiry: 3600,
      };
      (axios.post as Mock).mockResolvedValueOnce({ data: token });

      await authService.login({
        username: "me@example.com",
        password: "password",
      });
      expect(Storage.prototype.setItem).toBeCalled();
      expect(authService.state.user).toEqual(me);
    });
  });

  describe("logout", () => {
    it("should post and clear", async () => {
      (axios.post as Mock).mockResolvedValueOnce({});
      await authService.logout();
      expect(Storage.prototype.clear).toHaveBeenCalled();
    });
    it("should post and clear even after error", async () => {
      (axios.post as Mock).mockRejectedValueOnce({});
      await authService.logout();
      expect(Storage.prototype.clear).toHaveBeenCalled();
    });
  });

  describe("resetPassword", () => {
    it("should post", async () => {
      const data = {
        token: "token",
        password: "password",
      };
      (axios.post as Mock).mockResolvedValueOnce({});
      await authService.resetPassword(data);
      expect(axios.post).toBeCalledWith("auth/reset-password", data);
    });
  });

  describe("update", () => {
    it("should post", async () => {
      const data = {
        email: "me@example.com",
        first_name: "Some",
        last_name: "One",
      };
      (axios.patch as Mock).mockResolvedValueOnce({ data: data });
      await authService.update(data);
      expect(axios.patch).toBeCalledWith("users/me", data);
    });
  });
});
