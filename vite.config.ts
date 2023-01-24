import { fileURLToPath, URL } from "node:url";
import pluginRewriteAll from "vite-plugin-rewrite-all";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return ["hgroup"].indexOf(tag) !== -1;
          },
        },
      },
    }),
    pluginRewriteAll(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
