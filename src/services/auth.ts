import { reactive } from "vue";
import axios from "axios";
import router from "@/router";

export interface ICredentials {
  username: string;
  password: string;
}

export interface IResetPassword {
  token: string;
  password: string;
}

export interface IUser {
  id: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
}

export interface IUserUpdate {
  email: string;
  first_name: string;
  last_name: string;
}

export interface IAuthState {
  user: IUser;
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

const state: IAuthState = reactive({ ...initialState });

export default {
  get accessToken(): string | null {
    return localStorage.getItem("access_token");
  },
  get authenticated(): boolean {
    return this.accessToken !== null;
  },
  get user(): IUser {
    return state.user;
  },
  async forgotPassword(email: string) {
    const url = "auth/forgot-password";
    await axios.post(url, { email: email });
  },
  async me() {
    const url = "users/me";
    const response = await axios.get(url);
    state.user = response.data;
  },
  async login(credentials: ICredentials) {
    const url = "auth/token/login";
    const data = new FormData();
    data.append("username", credentials.username);
    data.append("password", credentials.password);
    const response = await axios.post(url, data);
    localStorage.setItem("access_token", response.data.access_token);
    await this.me();
  },
  async logout() {
    const url = "auth/token/logout";
    try {
      await axios.post(url);
    } catch (e) {
      // nothing to do as token is likely invalid
    }
    this.reset();
    await router.push("/login");
  },
  async resetPassword(data: IResetPassword) {
    const url = "auth/reset-password";
    await axios.post(url, data);
  },
  async update(data: IUserUpdate) {
    const url = "users/me";
    const response = await axios.patch(url, data);
    state.user = response.data;
  },
  reset() {
    state.user = initialState.user;
    localStorage.clear();
  },
};
