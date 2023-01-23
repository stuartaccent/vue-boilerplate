import { reactive } from "vue";
import axios from "axios";
import router from "@/router";

export interface IAuthCredentials {
  username: string;
  password: string;
}

export interface IAuthResetPassword {
  token: string;
  password: string;
}

export interface IAuthUser {
  id: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
}

export interface IAuthUserUpdate {
  email: string;
  first_name: string;
  last_name: string;
}

export interface IAuthState {
  user: IAuthUser;
}

const initialState: IAuthState = {
  user: {
    id: null,
    email: null,
    first_name: null,
    last_name: null,
    is_active: false,
    is_superuser: false,
    is_verified: false,
  },
};

export class AuthService {
  state: IAuthState = reactive({ ...initialState });

  get accessToken(): string | null {
    const tokenStr = localStorage.getItem("token");
    if (!tokenStr) return null;
    const token = JSON.parse(tokenStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > token.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem("token");
      return null;
    }
    return token.access_token;
  }

  get authenticated(): boolean {
    return this.accessToken !== null;
  }

  async forgotPassword(email: string): Promise<void> {
    const url = "auth/forgot-password";
    await axios.post(url, { email: email });
  }

  async me(): Promise<void> {
    const url = "users/me";
    const response = await axios.get(url);
    this.state.user = response.data;
  }

  async login(credentials: IAuthCredentials): Promise<void> {
    const url = "auth/token/login";
    const data = new FormData();
    data.append("username", credentials.username);
    data.append("password", credentials.password);
    const response = await axios.post(url, data);
    const expiry = new Date();
    expiry.setSeconds(expiry.getSeconds() + response.data.expiry);
    const tokenData = {
      access_token: response.data.access_token,
      expiry: expiry,
    };
    localStorage.setItem("token", JSON.stringify(tokenData));
    await this.me();
  }

  async logout(): Promise<void> {
    const url = "auth/token/logout";
    try {
      await axios.post(url);
    } catch (e) {
      // nothing to do as token is likely invalid
    }
    this.reset();
    await router.push("/login");
  }

  async resetPassword(data: IAuthResetPassword): Promise<void> {
    const url = "auth/reset-password";
    await axios.post(url, data);
  }

  async update(data: IAuthUserUpdate): Promise<void> {
    const url = "users/me";
    const response = await axios.patch(url, data);
    this.state.user = response.data;
  }

  reset(): void {
    this.state.user = initialState.user;
    localStorage.clear();
  }
}

export const authService = new AuthService();
