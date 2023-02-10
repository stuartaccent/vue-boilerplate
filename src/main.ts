import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { defaultConfig, plugin } from "@formkit/vue";
import axios from "axios";
import { setupInterceptorsTo } from "./interceptors";
import "./assets/main.scss";
import {
  helpStyle,
  messageStyle,
  removeBoxInnerWrapper,
} from "@/formkit/plugins";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// http interceptors
setupInterceptorsTo(axios);

const app = createApp(App);

app.use(router);

app.use(
  plugin,
  defaultConfig({
    plugins: [helpStyle, messageStyle, removeBoxInnerWrapper],
  })
);

app.mount("#app");
